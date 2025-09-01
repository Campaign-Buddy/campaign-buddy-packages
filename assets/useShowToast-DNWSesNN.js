import{j as s}from"./jsx-runtime-PJfywvQB.js";import{r as l,R as oe}from"./index-tnPESBdE.js";import{u as Z}from"./useBooleanState-BvRGCuoP.js";import{i as Pe}from"./index-C4WGByT4.js";import{H as c,C as P,W as R,Z as Se}from"./styled-components.browser.esm-CuL3HyEV.js";import{a as _e,I as te,S as ne,P as re,m as Re,T as Me,b as se,c as Ne,d as Ue,E as Ee,A as Fe,e as Te,N as Be,B as De,M as Le,f as ze,C as Ve,g as Ae,F as He,h as ie,u as le,i as Ge,j as Ke,k as We}from"./fuse.esm-BSXXkDLL.js";import"./index-D_0btrl3.js";import{u as qe,a as ae}from"./useCombinedRefs-Dfiq_Z7b.js";import{t as Qe}from"./index-B9gZL0fq.js";const m=Qe.parchment,ce=c(_e)`
	label.bp4-label {
		color: ${({theme:e})=>e.legacyCoreUi.colors.text};
		font-weight: 500;
	}

	& & {
		margin-bottom: 0;
	}
`;ce.defaultProps={theme:m};const E=({label:e,labelFor:t,children:r,className:o,onClick:n})=>{const i=l.useCallback(()=>n==null?void 0:n(),[n]);return s.jsx(ce,{label:n&&e?s.jsx("span",{onClick:i,children:e}):e,labelFor:t??"",className:o,children:r})},B=e=>{var t,r,o,n,i,a,f,d,p,u;return P`
	cursor: pointer;
	display: inline-flex;
	line-height: normal;
	align-items: center;
	outline: none;
	border: none;
	padding: ${e.sizing.padding.toCss()};
	min-height: ${e.sizing.height}px;
	max-height: ${e.sizing.height}px;
	min-width: ${e.sizing.minWidth}px;
	font-size: ${e.sizing.fontSize}px;
	gap: ${e.sizing.gap}px;
	border-radius: ${e.sizing.borderRadius.toCss()};
	background-color: ${e.states.default.background};
	box-shadow: ${(r=(t=e.states.default.shadow)===null||t===void 0?void 0:t.toCss())!==null&&r!==void 0?r:"none"};
	color: ${e.states.default.text};
	--cb-icon-color: ${e.states.default.text};

	&:hover {
		background-color: ${e.states.hover.background};
		color: ${e.states.hover.text};
		box-shadow: ${(n=(o=e.states.hover.shadow)===null||o===void 0?void 0:o.toCss())!==null&&n!==void 0?n:"none"};
		--cb-icon-color: ${e.states.hover.text};
	}

	&:active {
		background-color: ${e.states.active.background};
		color: ${e.states.active.text};
		box-shadow: ${(a=(i=e.states.active.shadow)===null||i===void 0?void 0:i.toCss())!==null&&a!==void 0?a:"none"};
		--cb-icon-color: ${e.states.active.text};
	}

	&:disabled {
		background-color: ${e.states.disabled.background};
		color: ${e.states.disabled.text};
		box-shadow: ${(d=(f=e.states.disabled.shadow)===null||f===void 0?void 0:f.toCss())!==null&&d!==void 0?d:"none"};
		--cb-icon-color: ${e.states.disabled.text};
	}

	&:focus {
		box-shadow: ${(u=(p=e.states.focus.shadow)===null||p===void 0?void 0:p.toCss())!==null&&u!==void 0?u:"none"};
	}

	.bp4-spinner-head {
		stroke: currentColor !important;
	}
`},Ze=c.span`
	margin-left: auto;
`,Je=P`
	${({theme:e})=>B(e.buttons.primary.normal)}
`,K=c.button`
	${({variant:e,theme:t,size:r})=>B(typeof e=="string"||!e?t.buttons[e??"primary"][r??"normal"]:e)}

	${({fill:e})=>e&&"width: 100%;"}
`;K.defaultProps={theme:m};const et=c(K)`
	color: ${({isActive:e,theme:t})=>e?t.legacyCoreUi.colors.text:t.legacyCoreUi.colors.textDisabled} !important;

	&:active,
	&:focus,
	&:hover {
		color: ${({isActive:e,theme:t})=>e?t.legacyCoreUi.colors.text:t.legacyCoreUi.colors.textDisabled} !important;
		--cb-icon-color: ${({isActive:e,theme:t})=>e?t.legacyCoreUi.colors.text:t.legacyCoreUi.colors.textDisabled};
	}
`,de=c(te)`
	color: var(--cb-icon-color, ${({theme:e})=>e.legacyCoreUi.colors.text});
`;de.defaultProps={theme:m};const Xe=c.img`
	object-fit: contain;
	width: ${({size:e})=>e}px;
	height: ${({size:e})=>e}px;
`;function J({size:e=16,icon:t}){if(typeof t=="string"||t.kind==="blueprint"){const r=typeof t=="string"?t:t.icon;return s.jsx(de,{size:e,icon:r})}return t.kind==="image"?s.jsx(Xe,{src:t.src,size:e}):(console.error("unsupported icon kind",t),null)}const Ye=["image","blueprint"];function eo(e){return typeof e=="string"||typeof e=="object"&&Ye.includes(e.kind)}var oo=function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]]);return r};const D=e=>{var{icon:t,rightIcon:r,onClick:o,children:n,variant:i,buttonRef:a,size:f,isLoading:d,disabled:p,fill:u}=e,g=oo(e,["icon","rightIcon","onClick","children","variant","buttonRef","size","isLoading","disabled","fill"]);return s.jsx(K,Object.assign({onClick:o,ref:a,size:f,variant:i,disabled:d||p,fill:u},g,{children:d?s.jsx(ne,{size:20}):s.jsxs(s.Fragment,{children:[t&&s.jsx(J,{icon:t}),n&&s.jsx("span",{children:n}),r&&s.jsx(Ze,{children:eo(r)?s.jsx(J,{icon:r}):r})]})}))},to=c.p`
	margin: 0;
	color: ${({theme:e})=>e.legacyCoreUi.colors.text};
	font-size: ${({fontSize:e})=>e??14}px;
`;to.defaultProps={theme:m};const no=c.a`
	color: ${({theme:e})=>e.legacyCoreUi.colors.primary};
	font-size: ${({fontSize:e})=>e??14}px;
	text-decoration: underline;

	&:hover {
		color: ${({theme:e})=>e.legacyCoreUi.colors.primaryHover};
	}

	&:active {
		color: ${({theme:e})=>e.legacyCoreUi.colors.primaryActive};
	}
`;no.defaultProps={theme:m};const ro=c(re)`
	max-width: 100%;
`,ue=R`
	.bp-overrides-popover .bp4-popover2-content {
		padding: ${({noPadding:e})=>e?"0":"8px"};
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.background} !important;
	}

	.bp-overrides-popover {
		margin: 4px;

		&.no-margin {
			margin: 0 !important;
		}
	}
`;ue.defaultProps={theme:m};const so={offset:{enabled:!0,options:{offset:[0,8]}}},io=({children:e,content:t,isOpen:r,onClose:o,placement:n,autoFocus:i,noMargin:a,className:f,noPadding:d})=>s.jsxs(s.Fragment,{children:[s.jsx(ue,{noPadding:d}),s.jsx(ro,{content:s.jsx("div",{children:t}),isOpen:r,onClose:o,minimal:!0,modifiers:so,popoverClassName:`bp-overrides-popover${a?" no-margin":""}`,placement:n,openOnTargetFocus:!1,enforceFocus:!1,autoFocus:i,className:f,children:e})]});var lo=function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]]);return r};const ao=c(io)`
	overflow: hidden;
`,pe=c.p`
	color: ${({theme:e})=>e.legacyCoreUi.colors.text};
	margin: 0;
	font-size: ${({fontSize:e})=>e??14}px;
	outline: none !important;
	text-overflow: ellipsis;
	overflow: hidden;
`;pe.defaultProps={theme:m};const co=c.div`
	min-height: 30px;
	display: flex;
	align-items: center;
`,uo=e=>{var{className:t,children:r}=e,o=lo(e,["className","children"]);return s.jsx(co,{className:t,children:s.jsx(pe,Object.assign({},o,{children:r}))})},po=c(uo)`
	cursor: pointer;

	&:hover,
	&:focus {
		text-decoration: underline;
	}
`,fe=c.div`
	width: 300px;
`;fe.defaultProps={theme:m};const me=c.p`
	color: ${({theme:e})=>e.legacyCoreUi.colors.text};
	text-overflow: ellipsis;
	overflow: hidden;

	.bp4-icon {
		vertical-align: super;
	}
`;me.defaultProps={theme:m};const fo=c.div`
	display: flex;
	align-items: center;
`,mo=c(Re.div)`
	overflow: hidden;
	padding: 3px;
	margin-right: 2px;
	flex-shrink: 0;
`;var go=function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]]);return r};const bo={hidden:{width:0,marginLeft:0,opacity:0},visible:{width:"auto",marginLeft:"4px",opacity:1}},ot=e=>{var{aggregatedDisplayValue:t,aggregationDescription:r,baseValueLabel:o,InputComponent:n,value:i,onChange:a,label:f,className:d,fontSize:p,hideButton:u}=e,g=go(e,["aggregatedDisplayValue","aggregationDescription","baseValueLabel","InputComponent","value","onChange","label","className","fontSize","hideButton"]);const[v,C]=l.useState(!1),[h,x,$]=Z(),[S,M,_]=Z(),b=(h||S)&&!v||(t==null?void 0:t.trim())===""?"visible":"hidden",y=l.useRef(null),N=l.useRef(null),w=l.useCallback(()=>{var I;C(!1),(I=N.current)===null||I===void 0||I.focus()},[]),k=l.useCallback(()=>C(!0),[]),U=l.useCallback(I=>{(I.key==="Enter"||I.key===" ")&&k()},[k]),O=r?s.jsx(Me,{content:r,children:s.jsx(te,{icon:"help",iconSize:10})}):null,j=s.jsxs(fe,{ref:y,children:[s.jsx("div",{tabIndex:0,onFocus:w}),s.jsx(n,Object.assign({value:i,onChange:a,label:o},g)),s.jsxs(me,{children:["Computed",O," = ",t]}),s.jsx("div",{tabIndex:0,onFocus:w})]});return s.jsx(E,{label:f,className:d,onClick:k,children:s.jsxs(fo,{onMouseEnter:M,onMouseLeave:_,children:[s.jsx(ao,{isOpen:v,onClose:w,content:j,children:s.jsx(po,{fontSize:p??14,onClick:k,tabIndex:u?0:void 0,onKeyDown:u?U:void 0,role:u?"button":void 0,children:t})}),!u&&s.jsx(mo,{variants:bo,initial:"unfocused",animate:b,children:s.jsx(D,{icon:"edit",onClick:k,onFocus:x,onBlur:$,variant:"minimal",buttonRef:N,size:"small"})})]})})};let ho=0;function F(){return l.useMemo(()=>`campaign-buddy-${ho++}`,[])}const T=P`
	background-color: ${({theme:e})=>e.input.base.backgroundColor};
	color: ${({theme:e})=>e.input.base.textColor};
`;var xo=function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]]);return r};const ge=c(se)`
	input {
		${T}
	}
`;ge.defaultProps={theme:m};const tt=e=>{var{value:t,onChange:r,label:o,id:n,rightElement:i}=e,a=xo(e,["value","onChange","label","id","rightElement"]);const f=l.useCallback(u=>{r(u.target.value)},[r]),d=F(),p=n??d;return s.jsx(E,{label:o,labelFor:p,children:s.jsx(ge,Object.assign({value:t,onChange:f,id:p,rightElement:i},a))})},vo=c(Ne)`
	${T}
	resize: vertical;
	min-height: 75px;
`;vo.defaultProps={theme:m};var yo=function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]]);return r};const be=c(se)`
	input {
		${T}
	}

	& .bp4-button {
		margin: 1px !important;

		&:first-child {
			border-radius: 0 3px 0 0 !important;
		}

		&:last-child {
			border-radius: 0 0 3px 0 !important;
		}
	}
`;be.defaultProps={theme:m};const nt=e=>{var{value:t,label:r,onChange:o,onBlur:n,onKeyDown:i,id:a}=e,f=yo(e,["value","label","onChange","onBlur","onKeyDown","id"]);const[d,p]=l.useState(`${t??0}`),u=F(),g=a??u,v=Se();l.useEffect(()=>{p(`${t??0}`)},[t]);const C=l.useCallback(()=>{try{const b=d.replace(/(\d+)?d(\d+)/g,(N,w,k)=>{const U=parseInt(w??"1"),O=parseInt(k);let j=0;for(let I=0;I<U;I++)j+=Math.floor(Math.random()*O)+1;return`${j}`}),y=parseFloat(Ue.eval(b));if(isNaN(y))return y;o(y)}catch{}},[d,o]),h=l.useCallback(b=>{const y=parseFloat(d);isNaN(y)?(p(`${b}`),o(b)):(p(`${y+b}`),o(y+b))},[o,d]),x=l.useCallback(()=>h(1),[h]),$=l.useCallback(()=>h(-1),[h]),S=l.useCallback(b=>{b.keyCode===Ee?C():b.keyCode===Fe?$():b.keyCode===Te&&x(),i==null||i(b)},[C,i,$,x]),M=l.useCallback(b=>{C(),n==null||n(b)},[C,n]),_=l.useCallback(b=>{p(b.target.value);const y=parseFloat(b.target.value);isNaN(y)||o(y)},[o]);return s.jsx(E,{label:r,labelFor:g,children:s.jsx(be,Object.assign({value:d,onChange:_,onKeyDown:S,onBlur:M,fill:!0,id:g,className:Be,rightElement:s.jsxs(De,{vertical:!0,children:[s.jsx(D,{variant:v.input.numeric.incrementButtons,onClick:x,icon:"chevron-up"}),s.jsx(D,{variant:v.input.numeric.incrementButtons,onClick:$,icon:"chevron-down"})]})},f))})},Co=P`
	box-shadow: 0 0 0 1px #137cbd, 0 0 0 3px rgb(19 124 189 / 30%),
		inset 0 1px 1px rgb(16 22 26 / 20%) !important;
`,rt=P`
	${T};

	cursor: text;
	border-radius: 3px;
	padding: 10px;
	flex: 1 1 auto;
	width: 100%;
	box-shadow: 0 0 0 0 rgb(19 124 189 / 0%), 0 0 0 0 rgb(19 124 189 / 0%),
		inset 0 0 0 1px rgb(16 22 26 / 15%), inset 0 1px 1px rgb(16 22 26 / 20%);
	transition: box-shadow 100ms cubic-bezier(0.4, 1, 0.75, 0.9),
		-webkit-box-shadow 100ms cubic-bezier(0.4, 1, 0.75, 0.9);

	&:focus-within {
		${Co}
	}
`,st=c.div`
	display: flex;
	${({justifyContent:e})=>e&&`justify-content: ${e};`}
	${({alignItems:e})=>e&&`align-items: ${e};`}
	${({gap:e})=>e&&`gap: ${e}px;`}
`,L=c(Le)`
	background-color: ${({theme:e})=>e.legacyCoreUi.colors.background};
	max-width: 95vw;
`;L.defaultProps={theme:m};const $o=c.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`,jo=c.span`
	line-height: initial;
`,z=c(ze)`
	${({verticalPadding:e})=>typeof e=="number"&&`
		padding-top: ${e}px !important;
		padding-bottom: ${e}px !important;
	`}
	align-items: center;
	color: ${({theme:e})=>e.legacyCoreUi.colors.text} !important;

	.bp4-menu-item-icon {
		${({iconMargin:e})=>typeof e=="number"&&`margin: ${e} !important;`}
	}

	.bp4-icon {
		--cb-icon-color: color: ${({theme:e})=>e.legacyCoreUi.colors.text} !important;
	}

	&.bp4-active,
	&.bp4-selected {
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.primary} !important;
		color: ${({theme:e})=>e.legacyCoreUi.colors.background} !important;

		.bp4-icon {
			color: ${({theme:e})=>e.legacyCoreUi.colors.background} !important;
		}
	}
`;z.defaultProps={theme:m};const he=R`
	.bp-overrides-menu-popover .bp4-menu {
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.background} !important;
	}
`;he.defaultProps={theme:m};const wo={popoverClassName:"bp-overrides-menu-popover"};function H({item:e,verticalPadding:t,isActive:r,iconMargin:o}){var n,i;return s.jsx(z,{verticalPadding:t,icon:e.icon,text:s.jsxs($o,{children:[s.jsx(jo,{children:e.displayText}),e.renderRightElement&&s.jsx("span",{children:e.renderRightElement()})]}),onClick:e.onClick,popoverProps:wo,tagName:"button",shouldDismissPopover:(n=e.shouldCloseMenuOnClick)!==null&&n!==void 0?n:!0,selected:r,iconMargin:o,children:(i=e==null?void 0:e.subItems)===null||i===void 0?void 0:i.map(a=>s.jsx(H,{item:a},a.displayText))})}function Oo({items:e,renderMenuItem:t,onClose:r}){return s.jsx(L,{children:e.map(o=>t?s.jsx("div",{children:t({MenuItem:H,item:o,closeMenu:r})},o.displayText):s.jsx(H,{item:o},o.displayText))})}function it({items:e,children:t,isOpen:r,renderMenuItem:o,onClose:n}){return s.jsxs(s.Fragment,{children:[s.jsx(he,{}),s.jsx(re,{content:s.jsx(Oo,{onClose:n,renderMenuItem:o,items:e}),isOpen:r,onClose:n,placement:"bottom-start",minimal:!0,openOnTargetFocus:!1,autoFocus:!0,popoverClassName:"bp-overrides-menu-popover",children:t})]})}const ko=R`
	.bp-overrides-icon-popover .bp4-menu {
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.background} !important;
	}

	.bp-overrides-icon-popover .bp4-menu {
		min-width: unset !important;

		.bp4-menu-item .bp4-icon {
			margin: 0 !important;
		}
	}
`;ko.defaultProps={theme:m};var Io=function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]]);return r};const xe=R`
	.bp-overrides-context-menu-popover .bp4-menu {
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.background} !important;
	}
`;xe.defaultProps={theme:m};const Po={popoverClassName:"bp-overrides-context-menu-popover",hasBackdrop:!1};function ve({item:e}){var t;return s.jsx(z,{icon:e.icon,text:e.displayText,onClick:e.onClick,popoverProps:Po,tagName:"button",shouldDismissPopover:e.shouldCloseMenuOnClick,children:(t=e==null?void 0:e.subItems)===null||t===void 0?void 0:t.map(r=>s.jsx(ve,{item:r},r.displayText))})}const W=oe.forwardRef((e,t)=>{var{menuItems:r,children:o,as:n}=e,i=Io(e,["menuItems","children","as"]);return s.jsxs(s.Fragment,{children:[s.jsx(xe,{}),s.jsx(Ve,Object.assign({tagName:n},i,{ref:t,content:s.jsx(L,{children:r.map((a,f)=>{var d;return s.jsx(ve,{item:a},(d=a.displayText)!==null&&d!==void 0?d:f)})}),children:o}))]})});W.displayName="ContextMenu";W.__docgenInfo={description:"",methods:[],displayName:"ContextMenu"};const So="CB_CORE_UI_LIST_ITEM",ye=P`
	list-style: none;
	padding: 0;
	margin: 0;
`;c.div`
	width: 100%;
	max-width: 100%;
	min-width: 0;
	flex-grow: 1;

	& > div {
		max-width: 100%;
	}
`;c(Ae)`
	&:before {
		background-color: transparent !important;
	}
`;c.ul`
	${ye}
`;c.ol`
	${ye}
`;const _o=P`
	--cb-icon-color: ${({theme:e})=>e.legacyCoreUi.colors.textDisabled};
`,Ce=P`
	display: flex;
	align-items: center;
	overflow: hidden;
	height: ${({theme:e})=>e.list.item.lineHeight+e.list.item.padding.vertical}px;
	gap: ${({theme:e})=>e.list.item.spacing}px;
	padding: ${({theme:e})=>e.list.item.padding.toCss()};
	border-radius: ${({theme:e})=>e.list.item.borderRadius.toCss()};

	color: ${({theme:e,disabled:t})=>t?e.legacyCoreUi.colors.textDisabled:e.textColor};

	${({disabled:e})=>e&&_o}

	${({theme:e,isInteractive:t})=>e.list.item.backgroundColors.map((r,o,n)=>`
			:nth-child(${n.length}n + ${o+1}) {
				background-color: ${r.normal};

				${t&&`
					&:hover {
						background-color: ${r.hover};
					}

					&:focus {
						background-color: ${r.focus};
					}
	
					&:active {
						background-color: ${r.active};
					}
					`}
			}
		`)}

	${({isInteractive:e})=>e&&`
		cursor: pointer;
		user-select: none;
	`}
`,Ro=c(W)`
	${Ce}
`,Mo=c.li`
	${Ce}
`;c.span`
	width: 100%;
	flex-grow: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;const No=l.createContext({focusedId:void 0});function Uo(){const e=F(),{focusedId:t}=l.useContext(No);return{id:e,canReceiveFocus:t===e}}const Eo=l.createContext({canReceiveFocus:!0});function X({canReceiveFocus:e,children:t}){return s.jsx(Eo.Provider,{value:{canReceiveFocus:e},children:t})}const Y={wasEventHandled:!1},$e=oe.forwardRef(({children:e,onClick:t,disabled:r,contextMenuItems:o},n)=>{const i=l.useRef(null),a=qe(i,n),{id:f,canReceiveFocus:d}=Uo(),p=l.useCallback(v=>{!Y.wasEventHandled&&!r&&(t==null||t(v)),Y.wasEventHandled=!1},[t,r]),u=l.useCallback(v=>{v.key==="Enter"&&v.target===i.current&&p(v)},[p]),g={ref:a,isInteractive:!!t,tabIndex:d?0:-1,role:t&&"button",onClick:t&&p,onKeyDown:t&&u,className:So,id:f,disabled:r};return o?s.jsx(X,{canReceiveFocus:d,children:s.jsx(Ro,Object.assign({},g,{menuItems:o,children:e}))}):s.jsx(X,{canReceiveFocus:d,children:s.jsx(Mo,Object.assign({},g,{children:e}))})});$e.displayName="displayName";$e.__docgenInfo={description:"",methods:[],displayName:"displayName"};c.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	padding: 12px 0;

	${({scrollStyle:e})=>e==="overlay"&&`
		overflow: auto;
	`}
`;const Fo=c.div`
	background-color: ${({theme:e})=>e.legacyCoreUi.colors.background};
	border-radius: 3px;
	min-width: min(400px, 100%);
	max-width: min(400px, 100%);
	margin-top: auto;
	margin: 0;

	${({scrollStyle:e})=>e==="content"&&`
		display: flex;
		flex-direction: column;
		max-height: 100%;
	`}
`;Fo.defaultProps={theme:m};c.div`
	padding: 12px;

	${({scrollStyle:e})=>e==="content"&&`
		overflow: auto;
	`}
`;const To=c.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px;

	& > h1 {
		color: ${({theme:e})=>e.legacyCoreUi.colors.text};
		margin: 0;
	}
`;To.defaultProps={theme:m};c.div`
	display: flex;
	justify-content: flex-end;
	padding: 12px;
`;const q=R`
	.campaign-buddy-select .bp4-transition-container {
		max-width: calc(100% - 10px);
	}

	.campaign-buddy-select .bp4-select-popover {
		padding: ${({theme:e})=>e.select.menu.padding.toCss()};
		background-color: ${({theme:e})=>e.select.menu.backgroundColor} !important;
		max-width: 100%;
		box-shadow: ${({theme:e})=>e.select.menu.dropShadow.toCss()} !important;
	}

	.campaign-buddy-select .bp4-select-popover .bp4-popover-content {
		background-color: ${({theme:e})=>e.select.menu.backgroundColor} !important;
	}

	.campaign-buddy-select .bp4-select-popover .bp4-input-group input {
		background-color: ${({theme:e})=>e.select.backgroundColor};
		color: ${({theme:e})=>e.select.textColor};
	}

	.campaign-buddy-select .bp4-select-popover .bp4-input-group .bp4-icon {
		color: ${({theme:e})=>e.select.textColor} !important;
	}
`;q.defaultProps={theme:m};const Q=c(D)`
	${({theme:e})=>B(e.select.button)}
`;Q.defaultProps={theme:m};const je=c.i`
	color: ${({theme:e})=>e.select.textColor};
	text-align: center;
	width: 100%;
	display: block;
	padding: 4px 0;
`;je.defaultProps={theme:m};function we(e){const t=l.useCallback(({items:n,itemsParentRef:i,renderItem:a})=>{const f=n.map(a).filter(d=>d!=null);return s.jsx(L,{ulRef:i,children:n.length===0?s.jsx(je,{children:"No results"}):f})},[]),r=l.useMemo(()=>{var n;return new Set((n=e==null?void 0:e.map(i=>i.id))!==null&&n!==void 0?n:[])},[e]),o=l.useCallback((n,{handleClick:i,modifiers:a})=>s.jsx(z,{active:a.active,onClick:i,text:n.displayValue,icon:r.has(n.id)?"tick":"blank"},n.id),[r]);return{renderMenu:t,renderItem:o}}function Oe(e){return l.useMemo(()=>({minimal:!0,portalClassName:"campaign-buddy-select",onClosing:()=>e(""),enforceFocus:!1,shouldReturnFocusOnClose:!1}),[e])}const Bo=ie.ofType();function lt({options:e,value:t,onChange:r,label:o,placeholder:n,isDisabled:i}){const a=F(),[f,d]=l.useState(""),p=l.useMemo(()=>t&&[t],[t]),{renderMenu:u,renderItem:g}=we(p),v=Oe(d),C=l.useMemo(()=>new He(e,{keys:["displayValue"]}),[e]),h=l.useCallback($=>d($),[]),x=l.useMemo(()=>f?C.search(f).map($=>$.item):e,[f,e,C]);return s.jsxs(E,{label:o,labelFor:a,children:[s.jsx(q,{}),s.jsx(Bo,{items:x,onItemSelect:r,itemListRenderer:u,itemRenderer:g,fill:!0,popoverProps:v,query:f,onQueryChange:h,disabled:i,children:s.jsx(Q,{variant:"minimal",rightIcon:"caret-down",fill:!0,id:a,children:t!=null&&t.displayValue?s.jsx("span",{children:t==null?void 0:t.displayValue}):s.jsx("i",{children:n??"Select an option"})})})]})}const G=c(ne)`
	.bp4-spinner-head {
		stroke: ${({theme:e})=>e.legacyCoreUi.colors.primary} !important;
	}
`;G.defaultProps={theme:m};const Do=c.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`,Lo={fullPage:45,textInline:15},ee=({fullHeight:e,size:t})=>{const r=typeof t=="number"?t:Lo[t];return e?s.jsx(Do,{children:s.jsx(G,{size:r})}):s.jsx(G,{size:r})};var V=function(e,t,r,o){function n(i){return i instanceof r?i:new r(function(a){a(i)})}return new(r||(r=Promise))(function(i,a){function f(u){try{p(o.next(u))}catch(g){a(g)}}function d(u){try{p(o.throw(u))}catch(g){a(g)}}function p(u){u.done?i(u.value):n(u.value).then(f,d)}p((o=o.apply(e,t||[])).next())})};const zo=ie.ofType();function at({fetchOptions:e,value:t,onChange:r,initialOptions:o,placeholder:n,label:i,disabled:a,isLoading:f}){var d;const p=F(),u=l.useMemo(()=>t&&[t],[t]),{renderMenu:g,renderItem:v}=we(u),[C,h]=l.useState(""),[x,$]=l.useState(!1),S=l.useRef(),M=Oe(h),[_,b]=l.useState(o??[]),y=le(e),N=l.useCallback(O=>V(this,void 0,void 0,function*(){const j=yield y(O);b(j),$(!1)}),[y]),w=ae(N,750);l.useEffect(()=>{function O(){return V(this,void 0,void 0,function*(){$(!0),S.current=y("");const j=yield S.current;b(j),$(!1)})}O()},[y]);const k=l.useCallback(O=>V(this,void 0,void 0,function*(){var j;(j=S.current)===null||j===void 0||j.cancel(),$(!0),h(O),w(O)}),[w]),U=l.useMemo(()=>({rightElement:x||f?s.jsx(ee,{size:"textInline"}):void 0,disabled:a}),[x,a,f]);return s.jsxs(E,{label:i,labelFor:p,children:[s.jsx(q,{}),s.jsx(zo,{items:(d=_??o)!==null&&d!==void 0?d:[],onItemSelect:r,itemListRenderer:g,itemRenderer:v,fill:!0,popoverProps:M,onQueryChange:k,query:C,inputProps:U,noResults:s.jsx("i",{children:"No results"}),disabled:a,children:s.jsx(Q,{variant:"minimal",rightIcon:f?s.jsx(ee,{size:"textInline"}):"caret-down",fill:!0,id:p,disabled:a,children:t!=null&&t.displayValue?s.jsx("span",{children:t==null?void 0:t.displayValue}):s.jsx("i",{children:n??"Select an option"})})})]})}const Vo=Ge.ofType(),Ao=c(Vo)`
	div.bp4-input {
		${T}
		align-items: center;

		& > .bp4-icon {
			padding-right: 8px;
			color: ${({theme:e})=>e.legacyCoreUi.colors.text};
		}
	}

	span.bp4-popover-target {
		width: 100%;
	}

	.bp4-tag {
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.primary};
	}
`;Ao.defaultProps={theme:m};var A=function(e,t,r,o){function n(i){return i instanceof r?i:new r(function(a){a(i)})}return new(r||(r=Promise))(function(i,a){function f(u){try{p(o.next(u))}catch(g){a(g)}}function d(u){try{p(o.throw(u))}catch(g){a(g)}}function p(u){u.done?i(u.value):n(u.value).then(f,d)}p((o=o.apply(e,t||[])).next())})};function ct(e,t){const[r,o]=l.useState(""),[n,i]=l.useState(!1),[a,f]=l.useState(e??[]),d=l.useRef(),p=l.useRef();l.useEffect(()=>{d.current=a},[a]);const u=le(t),g=l.useCallback(h=>A(this,void 0,void 0,function*(){const x=yield u(h);f(x),i(!1)}),[u]),v=ae(g,750);l.useEffect(()=>{function h(){return A(this,void 0,void 0,function*(){i(!0),p.current=u("");const x=yield p.current;i(!1),Pe(d.current,x)||f(x)})}h()},[u]);const C=l.useCallback(h=>A(this,void 0,void 0,function*(){var x;if(!h&&e)return f(e);(x=p.current)===null||x===void 0||x.cancel(),i(!0),o(h),v(h)}),[v]);return{query:r,setQuery:C,isLoading:n,options:a}}var Ho=function(e,t){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,o=Object.getOwnPropertySymbols(e);n<o.length;n++)t.indexOf(o[n])<0&&Object.prototype.propertyIsEnumerable.call(e,o[n])&&(r[o[n]]=e[o[n]]);return r};const ke=c(Ke)`
	color: ${({theme:e})=>e.legacyCoreUi.colors.text};
	margin-bottom: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: 2px 2px 2px 40px !important;

	&.bp4-control.bp4-switch input:checked ~ .bp4-control-indicator {
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.primary} !important;
	}

	&.bp4-control.bp4-switch:hover input:checked ~ .bp4-control-indicator {
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.primaryHover} !important;
	}
`;ke.defaultProps={theme:m};const dt=e=>{var{value:t,onChange:r,label:o}=e,n=Ho(e,["value","onChange","label"]);const i=l.useCallback(a=>r(a.target.checked),[r]);return s.jsx(ke,Object.assign({checked:t,onChange:i,label:o},n))},Ie=c(We)`
	background-color: ${({theme:e})=>e.legacyCoreUi.colors.primary};
`;Ie.defaultProps={theme:m};const ut=({children:e})=>s.jsx(Ie,{children:e});R`
	.bp4-toast {
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.background};
		color: ${({theme:e})=>e.legacyCoreUi.colors.text};
	}

	.bp4-button {
		${Je}
	}
`;l.createContext({current:null});export{ot as A,D as B,W as C,st as F,tt as I,no as L,it as M,nt as N,io as P,dt as S,ut as T,lt as a,ee as b,rt as c,m as d,E as e,et as f,J as g,we as h,Oe as i,Ao as j,ct as k,uo as l,at as m,F as u};
