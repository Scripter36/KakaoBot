## KakaoBot
[카카오톡 봇](https://play.google.com/store/apps/details?id=be.zvz.newskbot)을 통해 작동하는 카카오톡 봇 스크립트입니다.

## Features
* `#실행 내용`: 자바스크립트를 실행합니다.

Aliases: `계산`, `eval`

[Rhino](https://developer.mozilla.org/ko/docs/Rhino)의 `standardObjects` 중 `CallSite`, `isXMLName`, `uneval`, `InternalError`, `JavaException`, `With`, `Call`, `Script`, `Iterator`, `StopIteration`, `Continuation`, `XML`, `XMLList`, `Namespace`, `QName`, `Packages`, `getClass`, `JavaAdapter`, `JavaImporter`, `java`, `javax`, `org`, `com`, `edu`, `net`, `android`를 제거하고, 무한루프를 방지하기 위해 `50ms`의 시간제한을 두고 실행합니다.

## Development

`npm install` 후 `src` 폴더의 내용을 수정하세요.

build: `npm run build`

watch: `npm run watch`