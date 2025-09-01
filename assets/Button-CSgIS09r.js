const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./gi-BFAegp5r.js","./iconBase-DRO9aDiR.js","./index-tnPESBdE.js","./io5-Bzo-0pZI.js"])))=>i.map(i=>d[i]);
import{j as t}from"./jsx-runtime-PJfywvQB.js";import{r as p,R as b}from"./index-tnPESBdE.js";import{b as I}from"./backgroundColor-DgtptAGf.js";import{u as C}from"./index-D_0btrl3.js";import{H as d}from"./styled-components.browser.esm-CuL3HyEV.js";import{_ as f}from"./iframe-Bt_IFqIv.js";const s="primary";function R(e=s,n,a){const r=e==="selected"?"primary":e;return I(n.colors[r][a])}function v(e=s,n,a){const r=e!=="primary"?"none":"raised",o=n.shadows[r][a];return o?`box-shadow: ${o.toCss()};`:""}function i(e=s,n,a){if(a==="focused")return v(e,n,a);const r=[R(e,n,a),v(e,n,a)];return a==="disabled"&&r.push(`color: ${n.colors.secondaryText[g(e)]};`,"cursor: not-allowed;"),r.join(" ")}function g(e=s){return e==="primary"||e==="selected"?"onPrimary":e==="danger"?"onDanger":"onBackground"}const _=d.button`
	display: inline-flex;
	cursor: pointer;
	border-radius: ${({theme:e})=>e.borderRadii.default.toCss()};
	align-items: center;
	border: none;
	min-width: ${({theme:e,size:n="medium"})=>e.sizes.uiHeights[n]}px;
	outline: none;

	padding: ${({theme:e,size:n="medium"})=>e.sizes.uiContentPadding[n].toCss()};
	height: ${({theme:e,size:n="medium"})=>e.sizes.uiHeights[n]}px;
	gap: ${({theme:e})=>e.sizes.gaps.small}px;
	font-size: ${({theme:e,size:n="medium"})=>e.sizes.uiFont[n]}px;

	color: ${({theme:e,variant:n="primary"})=>e.colors.primaryText[g(n)]};
	transition: background-color 0.1s;

	${({theme:e,variant:n})=>i(n,e,"default")}

	&:hover {
		${({theme:e,variant:n})=>i(n,e,"hover")}
	}

	&:active {
		${({theme:e,variant:n})=>i(n,e,"active")}
	}

	&:focus {
		${({theme:e,variant:n})=>i(n,e,"focused")}
	}

	${({theme:e,variant:n,disabled:a})=>a&&i(n,e,"disabled")}

	&:disabled {
		${({theme:e,variant:n})=>i(n,e,"disabled")}
	}
`,E=d.span`
	margin-left: auto;
	display: inline-flex;
	align-items: center;
`,j={character:"gi/GiMeeple",chevronDown:"io5/IoChevronDown",chevronLeft:"io5/IoChevronBack",chevronRight:"io5/IoChevronForward",chevronUp:"io5/IoChevronUp",cross:"io5/IoClose",d20:"gi/GiDiceTwentyFacesTwenty",note:"io5/IoDocumentText",profile:"io5/IoPeopleCircleOutline"},z=d.span`
	display: inline-block;
	width: ${({size:e})=>e}px;
	height: ${({size:e})=>e}px;

	svg {
		fill: currentColor;
	}
`;function c({name:e,size:n="medium"}){const a=C(),r=L(j[e]);return t.jsx(z,{size:a.sizes.iconSizes[n],children:r&&t.jsx(r,{size:a.sizes.iconSizes[n]})})}const h=Object.assign({"./react-icons/gi.ts":()=>f(()=>import("./gi-BFAegp5r.js").then(e=>e.b),__vite__mapDeps([0,1,2]),import.meta.url),"./react-icons/io5.ts":()=>f(()=>import("./io5-Bzo-0pZI.js").then(e=>e.b),__vite__mapDeps([3,1,2]),import.meta.url)});function L(e){const[n,a]=p.useState(null);return p.useEffect(()=>{if(!e)return;let r=!1;const[o,u]=e.split("/"),l=h[`./react-icons/${o}.ts`]??h[`./react-icons/${o}.js`];if(l)return l().then(m=>{r||a(()=>m[u])}),()=>{r=!0}},[e]),n}c.__docgenInfo={description:"",methods:[],displayName:"Icon",props:{name:{required:!0,tsType:{name:"union",raw:"keyof typeof iconNames",elements:[{name:"literal",value:"character"},{name:"literal",value:"chevronDown"},{name:"literal",value:"chevronLeft"},{name:"literal",value:"chevronRight"},{name:"literal",value:"chevronUp"},{name:"literal",value:"cross"},{name:"literal",value:"d20"},{name:"literal",value:"note"},{name:"literal",value:"profile"}]},description:""},size:{required:!1,tsType:{name:"Stepped",elements:[{name:"any"}],raw:"Stepped<any>"},description:"",defaultValue:{value:"'medium'",computed:!1}}}};const y=b.forwardRef(({onClick:e,leftIcon:n,rightIcon:a,disabled:r,size:o="medium",variant:u,children:l,onFocus:m,role:w,id:x,...T},$)=>t.jsxs(_,{onClick:e,disabled:r,size:o,variant:u,role:w,onFocus:m,ref:$,id:x,...T,children:[n&&t.jsx(c,{name:n,size:o}),l&&t.jsx("span",{children:l}),a&&t.jsx(E,{children:t.jsx(c,{name:a,size:o})})]}));y.displayName="Button";y.__docgenInfo={description:"",methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'minimal' | 'primary' | 'danger' | 'selected'",elements:[{name:"literal",value:"'minimal'"},{name:"literal",value:"'primary'"},{name:"literal",value:"'danger'"},{name:"literal",value:"'selected'"}]},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"",defaultValue:{value:"'medium'",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLButtonElement>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLButtonElement>",elements:[{name:"HTMLButtonElement"}]},name:"event"}],return:{name:"void"}}},description:""},leftIcon:{required:!1,tsType:{name:"union",raw:"keyof typeof iconNames",elements:[{name:"literal",value:"character"},{name:"literal",value:"chevronDown"},{name:"literal",value:"chevronLeft"},{name:"literal",value:"chevronRight"},{name:"literal",value:"chevronUp"},{name:"literal",value:"cross"},{name:"literal",value:"d20"},{name:"literal",value:"note"},{name:"literal",value:"profile"}]},description:""},rightIcon:{required:!1,tsType:{name:"union",raw:"keyof typeof iconNames",elements:[{name:"literal",value:"character"},{name:"literal",value:"chevronDown"},{name:"literal",value:"chevronLeft"},{name:"literal",value:"chevronRight"},{name:"literal",value:"chevronUp"},{name:"literal",value:"cross"},{name:"literal",value:"d20"},{name:"literal",value:"note"},{name:"literal",value:"profile"}]},description:""},role:{required:!1,tsType:{name:"AriaRole"},description:""},id:{required:!1,tsType:{name:"string"},description:""},onFocus:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{y as B,c as I,E as R,_ as S};
