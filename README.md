# MindMap
Mind test: How you feel today

## 프로젝트 명

개요 : 프로젝트에 대한 설명 \
기간 : 2025.07.00 ~

### React 

- npx create-react-app 프로젝트 이름
- react version : v.18.x

### node.js 

- node version : v.22.x

### 서버구동

- `yarn start`

### 빌드

- `yarn build`


### FILE STRUCTURE

```bash
  src                   # 작업폴더
  │
  └───assets            # assets 폴더 (이미지, css 파일, 폰트 파일)
  └───components        # 컴포넌트 폴더 (하위 폴더에서 세분화)
    └───_tests_         # 테스트 용
    └───form            # 컴포넌트 폴더 예시
    └───iu              # 컴포넌트 폴더 예시
  └───context           # context 폴더 (React context 파일)
  └───data              # 데이터 폴더 (JSON 파일, 전역으로 사용하는 상수 변수가 포함된 파일)
  └───features          # 기능별 폴더 
    └───todos           # 기능별 폴더 예시
      └───components    # 기능별 폴더 예시
      └───hooks         # 기능별 폴더 예시
      └───services      # 기능별 폴더 예시
      index.js         
  └───hooks             # hooks 폴더 (전역 hook만 저장)
  └───layouts           # 레이아웃 폴더 (다양한 레이아웃을 사용하는 경우)
  └───lib               # 라이브러리 폴더 (라이브러리의 파사드)
  └───pages             # 페이지 폴더
    └───_tests_         # 테스트 용
    Home.js             
  └───services          # 서비스 폴더 (외부 API와 상호작용하는 모든 코드)
  └───utils             # 유틸리티 폴더 (포맷팅 함수 등 모든 유틸리티 기능)
  App.js                 
  index.js              
```


## Library

```
[MUI]
npm i @mui/material @emotion/react @emotion/styled

[폰트]
npm i @fontsource/roboto
npm i @fontsource/pretandard

[아이콘]
npm i @mui/icons-material

[라우터]
npm i react-router-dom
```

## Visual Studio Code - Settings.json

```
{
	"git.confirmSync": false,
	"gitlens.advanced.messages": {
		"suppressGitMissingWarning": true
	},
	"emmet.preferences": {
		"css.valueSeparator": ":",
		"css.propertyEnd": ""
	},
	"liveServer.settings.donotShowInfoMsg": true,
	"liveServer.settings.donotVerifyTags": true,
	"auto-rename-tag.activationOnLanguage": ["*"],
	"workbench.startupEditor": "none",
	"[html]": {
		"editor.defaultFormatter": "vscode.html-language-features"
	}
}

```

## Visual Studio Code - Settings.json - 사용자설정

```
{
	"git.confirmSync": false,
	"gitlens.advanced.messages": {
		"suppressGitMissingWarning": true
	},
	"emmet.preferences": {
		"css.valueSeparator": ":",
		"css.propertyEnd": ""
	},
	"liveServer.settings.donotShowInfoMsg": true,
	"liveServer.settings.donotVerifyTags": true,
	"auto-rename-tag.activationOnLanguage": ["*"],
	"security.workspace.trust.untrustedFiles": "open",
	"prettier.printWidth": 200,
	"prettier.tabWidth": 2,
	"prettier.useTabs": true,
	"prettier.semi": true,
	"prettier.singleQuote": false,
	"prettier.trailingComma": "all",
	"prettier.endOfLine": "auto",
	"prettier.bracketSpacing": false,
	"prettier.htmlWhitespaceSensitivity": "css",
	"workbench.startupEditor": "none",
	"liveServer.settings.port": 5501,
	"editor.tabSize": 2,
	//* HTML CSS Support 추가 설정
	"css.enabledLanguages": ["html", "javascriptreact", "typescriptreact", "typescript", "javascript", "scss"],
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"editor.formatOnSave": true,
	"svg.preview.mode": "svg",
	"editor.wordWrap": "on"
}

```

## Prettier 설정

```
VS Code > setting
Format on Save 확인
Default Formatter : prettier format
```

## Figma

```
피그마 주소
```

## SVG

```
VScode extension SVG
https://marketplace.visualstudio.com/items?itemName=jock.svg

1. <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"> width, height 삭제
2. 경량화 - Minify SVG
3. Data URI로 변환
https://yoksel.github.io/url-encoder/
4. Take encoded copy
5. 함수화 하기