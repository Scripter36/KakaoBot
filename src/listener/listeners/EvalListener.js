import CommandListener from '../CommandListener'

const Context = org.mozilla.javascript.Context

class EvalListener extends CommandListener {
  execute (event) {
    const cancel = super.execute(event)
    if (cancel) return
    let context, timeThread
    const mainThread = new java.lang.Thread(new java.lang.Runnable({
      run () {
        try {
          context = Context.enter()
          context.setOptimizationLevel(-1)
          context.setMaximumInterpreterStackDepth(1000)
          context.setInstructionObserverThreshold(10)
          let scope = EvalListener.getSafeScope(context)
          const virtualConsole = []
          scope.console = {
            log: (message) => {
              virtualConsole.push(message)
            }
          }
          scope.replier = {
            reply: (message) => {
              virtualConsole.push(message)
            }
          }
          scope.console.log.toString = () => 'function log() { [native code for console.log, arity=1] }\n'
          scope.replier.reply.toString = () => 'function reply() { [native code for replier.reply, arity=1] }\n'
          scope.console.toString = () => '[object console]'
          scope.replier.toString = () => '[object replier]'
          timeThread = new java.lang.Thread(new java.lang.Runnable({
            run () {
              try {
                java.lang.Thread.sleep(50)
                event.getReplier().reply(`오류: 시간이 초과되었습니다.`)
                mainThread.stop()
              } catch (e) { }
            }
          }))
          timeThread.start()
          const returnedResult = context.evaluateString(scope, event.getMessage(), 'eval', 1, null)
          const result = `결과: ${returnedResult}\n출력: ${virtualConsole.join('\n')}`
          event.getReplier().reply(result)
          timeThread.interrupt()
        } catch (e) {
          event.getReplier().reply(`오류: ${e.message} (${e.fileName}:${isNaN(e.lineNumber) ? 1 : e.lineNumber + 1})`)
          if (timeThread) timeThread.interrupt()
        } finally {
          context.exit()
          // context.exit()
        }
      }
    }))
    mainThread.start()
  }

  static getSafeScope (context) {
    const scope = context.initStandardObjects()
    // VSCode에 정의되지 않은 것들은 모두 제거하였습니다.
    /* Function, Object, Error, CallSite, decodeURI, decodeURIComponent, encodeURI, encodeURIComponent, escape, eval, isFinite, isNaN, isXMLName, parseFloat, parseInt, unescape, uneval, NaN, Infinity, undefined, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError, InternalError, JavaException, Array, String, Boolean, Number, Date, Math, JSON, With, Call, Script, Iterator, StopIteration, RegExp, Continuation, XML, XMLList, Namespace, QName, Packages, getClass, JavaAdapter, JavaImporter, java, javax, org, com, edu, net, android */
    delete scope.CallSite
    delete scope.isXMLName
    delete scope.uneval
    delete scope.InternalError
    delete scope.JavaException
    delete scope.With
    delete scope.Call
    delete scope.Script
    delete scope.Iterator
    delete scope.StopIteration
    delete scope.Continuation
    delete scope.XML
    delete scope.XMLList
    delete scope.Namespace
    delete scope.QName
    delete scope.Packages
    delete scope.getClass
    delete scope.JavaAdapter
    delete scope.JavaImporter
    delete scope.java
    delete scope.javax
    delete scope.org
    delete scope.com
    delete scope.edu
    delete scope.net
    delete scope.android
    return scope
  }

  static getObjectSize (object) {
    var objectList = []
    var stack = [object]
    var bytes = 0

    while (stack.length) {
      var value = stack.pop()

      if (typeof value === 'boolean') {
        bytes += 4
      } else if (typeof value === 'string') {
        bytes += value.length * 2
      } else if (typeof value === 'number') {
        bytes += 8
      } else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
        objectList.push(value)
        for (var i in value) {
          stack.push(value[i])
        }
      }
    }
    return bytes
  }
}

export default EvalListener
