import{j as o}from"./jsx-runtime-PJfywvQB.js";import{r as a,R as le}from"./index-tnPESBdE.js";import{_ as de,o as pe,p as ue,q as nt,I as G,r as ot,B as me,s as st,t as rt,v as _,D as fe,w as ye,x as at,y as it,z as ct,G as X,H as J,O as ge,J as lt,K as dt,L as pt,a as ut,S as he,P as te,m as mt,u as ie,T as ft,b as Te,c as yt,d as gt,E as ht,A as Tt,e as xt,N as It,M as bt,f as vt,C as Ct,g as wt,Q as kt,F as xe,h as Ie,i as be,j as ve,k as Rt,l as Ot,n as $t}from"./fuse.esm-DpGxg_dX.js";import{i as Ce}from"./index-C4WGByT4.js";import{H as p,C as q,W as P,Z as jt}from"./styled-components.browser.esm-CuL3HyEV.js";import{u as Nt}from"./index-DwWHXmyK.js";import{u as St}from"./useCombinedRefs-G3-tKQwR.js";import{t as qt}from"./index-CNLxx85X.js";import{r as Dt}from"./index-BJt650PE.js";const y=qt.parchment;var Mt=function(e){de(t,e);function t(){var n=e!==null&&e.apply(this,arguments)||this;return n.handleActionClick=function(s){var r,i;(i=(r=n.props.action)===null||r===void 0?void 0:r.onClick)===null||i===void 0||i.call(r,s),n.triggerDismiss(!1)},n.handleCloseClick=function(){return n.triggerDismiss(!1)},n.startTimeout=function(){n.clearTimeouts(),n.props.timeout>0&&n.setTimeout(function(){return n.triggerDismiss(!0)},n.props.timeout)},n}return t.prototype.render=function(){var n=this.props,s=n.className,r=n.icon,i=n.intent,c=n.message;return a.createElement("div",{className:pe(ue,nt(i),s),onBlur:this.startTimeout,onFocus:this.clearTimeouts,onMouseEnter:this.clearTimeouts,onMouseLeave:this.startTimeout,tabIndex:0},a.createElement(G,{icon:r}),a.createElement("span",{className:ot},c),a.createElement(me,{minimal:!0},this.maybeRenderActionButton(),a.createElement(st,{"aria-label":"Close",icon:"cross",onClick:this.handleCloseClick})))},t.prototype.componentDidMount=function(){this.startTimeout()},t.prototype.componentDidUpdate=function(n){n.timeout!==this.props.timeout&&(this.props.timeout>0?this.startTimeout():this.clearTimeouts())},t.prototype.componentWillUnmount=function(){this.clearTimeouts()},t.prototype.maybeRenderActionButton=function(){var n=this.props.action;if(n!=null)return a.createElement(rt,_({},n,{intent:void 0,onClick:this.handleActionClick}))},t.prototype.triggerDismiss=function(n){var s,r;this.clearTimeouts(),(r=(s=this.props).onDismiss)===null||r===void 0||r.call(s,n)},t.defaultProps={className:"",message:"",timeout:5e3},t.displayName="".concat(fe,".Toast"),t}(ye),Pt=function(e){de(t,e);function t(){var n=e!==null&&e.apply(this,arguments)||this;return n.state={toasts:[]},n.toastId=0,n.renderToast=function(s){return a.createElement(Mt,_({},s,{onDismiss:n.getDismissHandler(s)}))},n.getDismissHandler=function(s){return function(r){n.dismiss(s.key,r)}},n.handleClose=function(s){s.which===pt&&n.clear()},n}return t.create=function(n,s){s===void 0&&(s=document.body),n!=null&&n.usePortal!=null&&!at("production")&&console.warn(it);var r=document.createElement("div");s.appendChild(r);var i=Dt.render(a.createElement(t,_({},n,{usePortal:!1})),r);if(i==null)throw new Error(ct);return i},t.prototype.show=function(n,s){this.props.maxToasts&&this.dismissIfAtLimit();var r=this.createToastOptions(n,s);return s===void 0||this.isNewToastKey(s)?this.setState(function(i){return{toasts:X([r],i.toasts,!0)}}):this.setState(function(i){return{toasts:i.toasts.map(function(c){return c.key===s?r:c})}}),r.key},t.prototype.dismiss=function(n,s){s===void 0&&(s=!1),this.setState(function(r){var i=r.toasts;return{toasts:i.filter(function(c){var l,d=c.key===n;return d&&((l=c.onDismiss)===null||l===void 0||l.call(c,s)),!d})}})},t.prototype.clear=function(){this.state.toasts.forEach(function(n){var s;return(s=n.onDismiss)===null||s===void 0?void 0:s.call(n,!1)}),this.setState({toasts:[]})},t.prototype.getToasts=function(){return this.state.toasts},t.prototype.render=function(){var n=pe(J,this.getPositionClasses(),this.props.className);return a.createElement(ge,{autoFocus:this.props.autoFocus,canEscapeKeyClose:this.props.canEscapeKeyClear,canOutsideClickClose:!1,className:n,enforceFocus:!1,hasBackdrop:!1,isOpen:this.state.toasts.length>0||this.props.children!=null,onClose:this.handleClose,shouldReturnFocusOnClose:!1,transitionDuration:350,transitionName:ue,usePortal:this.props.usePortal},this.state.toasts.map(this.renderToast,this),this.props.children)},t.prototype.validateProps=function(n){var s=n.maxToasts;if(s!==void 0&&s<1)throw new Error(lt)},t.prototype.isNewToastKey=function(n){return this.state.toasts.every(function(s){return s.key!==n})},t.prototype.dismissIfAtLimit=function(){this.state.toasts.length===this.props.maxToasts&&this.dismiss(this.state.toasts[this.state.toasts.length-1].key)},t.prototype.createToastOptions=function(n,s){return s===void 0&&(s="toast-".concat(this.toastId++)),_(_({},n),{key:s})},t.prototype.getPositionClasses=function(){var n=this.props.position.split("-");return X(X([],n.map(function(s){return"".concat(J,"-").concat(s.toLowerCase())}),!0),["".concat(J,"-").concat(this.props.usePortal?"in-portal":"inline")],!1)},t.displayName="".concat(fe,".Toaster"),t.defaultProps={autoFocus:!1,canEscapeKeyClear:!0,position:dt.TOP,usePortal:!0},t}(ye);const we=p(ut)`
	label.bp4-label {
		color: ${({theme:e})=>e.legacyCoreUi.colors.text};
		font-weight: 500;
	}

	& & {
		margin-bottom: 0;
	}
`;we.defaultProps={theme:y};const N=({label:e,labelFor:t,children:n,className:s,onClick:r})=>{const i=a.useCallback(()=>r==null?void 0:r(),[r]);return o.jsx(we,{label:r&&e?o.jsx("span",{onClick:i,children:e}):e,labelFor:t??"",className:s,children:n})};N.__docgenInfo={description:"",methods:[],displayName:"FormGroup",props:{label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},labelFor:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const H=e=>{var t,n,s,r,i;return q`
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
	box-shadow: ${((t=e.states.default.shadow)==null?void 0:t.toCss())??"none"};
	color: ${e.states.default.text};
	--cb-icon-color: ${e.states.default.text};

	&:hover {
		background-color: ${e.states.hover.background};
		color: ${e.states.hover.text};
		box-shadow: ${((n=e.states.hover.shadow)==null?void 0:n.toCss())??"none"};
		--cb-icon-color: ${e.states.hover.text};
	}

	&:active {
		background-color: ${e.states.active.background};
		color: ${e.states.active.text};
		box-shadow: ${((s=e.states.active.shadow)==null?void 0:s.toCss())??"none"};
		--cb-icon-color: ${e.states.active.text};
	}

	&:disabled {
		background-color: ${e.states.disabled.background};
		color: ${e.states.disabled.text};
		box-shadow: ${((r=e.states.disabled.shadow)==null?void 0:r.toCss())??"none"};
		--cb-icon-color: ${e.states.disabled.text};
	}

	&:focus {
		box-shadow: ${((i=e.states.focus.shadow)==null?void 0:i.toCss())??"none"};
	}

	.bp4-spinner-head {
		stroke: currentColor !important;
	}
`},Et=p.span`
	margin-left: auto;
`,_t=q`
	${({theme:e})=>H(e.buttons.primary.normal)}
`,ne=p.button`
	${({variant:e,theme:t,size:n})=>H(typeof e=="string"||!e?t.buttons[e??"primary"][n??"normal"]:e)}

	${({fill:e})=>e&&"width: 100%;"}
`;ne.defaultProps={theme:y};const At=p(ne)`
	color: ${({isActive:e,theme:t})=>e?t.legacyCoreUi.colors.text:t.legacyCoreUi.colors.textDisabled} !important;

	&:active,
	&:focus,
	&:hover {
		color: ${({isActive:e,theme:t})=>e?t.legacyCoreUi.colors.text:t.legacyCoreUi.colors.textDisabled} !important;
		--cb-icon-color: ${({isActive:e,theme:t})=>e?t.legacyCoreUi.colors.text:t.legacyCoreUi.colors.textDisabled};
	}
`,ke=p(G)`
	color: var(--cb-icon-color, ${({theme:e})=>e.legacyCoreUi.colors.text});
`;ke.defaultProps={theme:y};const Ft=p.img`
	object-fit: contain;
	width: ${({size:e})=>e}px;
	height: ${({size:e})=>e}px;
`;function A({size:e=16,icon:t}){if(typeof t=="string"||t.kind==="blueprint"){const n=typeof t=="string"?t:t.icon;return o.jsx(ke,{size:e,icon:n})}return t.kind==="image"?o.jsx(Ft,{src:t.src,size:e}):(console.error("unsupported icon kind",t),null)}A.__docgenInfo={description:"",methods:[],displayName:"Icon",props:{size:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"16",computed:!1}},icon:{required:!0,tsType:{name:"union",raw:"ImageIcon | BlueprintIcon | IconName",elements:[{name:"ImageIcon"},{name:"BlueprintIcon"},{name:"IconName"}]},description:""}}};const Lt=["image","blueprint"];function Bt(e){return typeof e=="string"||typeof e=="object"&&Lt.includes(e.kind)}const M=({icon:e,rightIcon:t,onClick:n,children:s,variant:r,buttonRef:i,size:c,isLoading:l,disabled:d,fill:m,...g})=>o.jsx(ne,{onClick:n,ref:i,size:c,variant:r,disabled:l||d,fill:m,...g,children:l?o.jsx(he,{size:20}):o.jsxs(o.Fragment,{children:[e&&o.jsx(A,{icon:e}),s&&o.jsx("span",{children:s}),t&&o.jsx(Et,{children:Bt(t)?o.jsx(A,{icon:t}):t})]})});M.__docgenInfo={description:"",methods:[],displayName:"Button",props:{icon:{required:!1,tsType:{name:"union",raw:"ImageIcon | BlueprintIcon | IconName",elements:[{name:"ImageIcon"},{name:"BlueprintIcon"},{name:"IconName"}]},description:""},rightIcon:{required:!1,tsType:{name:"union",raw:"CampaignBuddyIcon | JSX.Element",elements:[{name:"union",raw:"ImageIcon | BlueprintIcon | IconName",elements:[{name:"ImageIcon"},{name:"BlueprintIcon"},{name:"IconName"}]},{name:"JSX.Element"}]},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(event: React.MouseEvent<HTMLElement, MouseEvent>) => void",signature:{arguments:[{type:{name:"ReactMouseEvent",raw:"React.MouseEvent<HTMLElement, MouseEvent>",elements:[{name:"HTMLElement"},{name:"MouseEvent"}]},name:"event"}],return:{name:"void"}}},description:""},variant:{required:!1,tsType:{name:"union",raw:"ButtonStyle | IButton",elements:[{name:"union",raw:"'primary' | 'minimal'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'minimal'"}]},{name:"IButton"}]},description:`Prefer to use named button style instead of passing in custom theme
overrides. Custom theme overrides should always be specified by a
theme object and never be hard coded.`},buttonRef:{required:!1,tsType:{name:"ReactRefObject",raw:"React.RefObject<HTMLButtonElement>",elements:[{name:"HTMLButtonElement"}]},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'normal' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'normal'"},{name:"literal",value:"'large'"}]},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:""},fill:{required:!1,tsType:{name:"boolean"},description:""}},composes:["Omit"]};const Re=({value:e,onChange:t,icon:n,size:s,preventFocus:r,tabIndex:i})=>{const c=a.useCallback(()=>{t(!e)},[t,e]),l=a.useCallback(d=>{d.preventDefault(),t(!e)},[t,e]);return o.jsx(At,{onClick:r?void 0:c,onMouseDown:r?l:void 0,size:s,variant:"minimal",isActive:e,tabIndex:i,children:o.jsx(A,{icon:n})})};Re.__docgenInfo={description:"",methods:[],displayName:"ToggleButton",props:{value:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"value"}],return:{name:"void"}}},description:""},icon:{required:!0,tsType:{name:"IconName"},description:""},tooltip:{required:!1,tsType:{name:"string"},description:""},size:{required:!1,tsType:{name:"union",raw:"'small' | 'normal' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'normal'"},{name:"literal",value:"'large'"}]},description:""},preventFocus:{required:!1,tsType:{name:"boolean"},description:""},tabIndex:{required:!1,tsType:{name:"number"},description:""}}};const Ut=p.p`
	margin: 0;
	color: ${({theme:e})=>e.legacyCoreUi.colors.text};
	font-size: ${({fontSize:e})=>e??14}px;
`;Ut.defaultProps={theme:y};const Oe=p.a`
	color: ${({theme:e})=>e.legacyCoreUi.colors.primary};
	font-size: ${({fontSize:e})=>e??14}px;
	text-decoration: underline;

	&:hover {
		color: ${({theme:e})=>e.legacyCoreUi.colors.primaryHover};
	}

	&:active {
		color: ${({theme:e})=>e.legacyCoreUi.colors.primaryActive};
	}
`;Oe.defaultProps={theme:y};const zt=({onClick:e,children:t})=>{const n=a.useCallback(s=>{s.preventDefault(),e()},[e]);return o.jsx(Oe,{onClick:n,children:t})};zt.__docgenInfo={description:"",methods:[],displayName:"LinkButton",props:{onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const Ht=p(te)`
	max-width: 100%;
`,$e=P`
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
`;$e.defaultProps={theme:y};const Vt={offset:{enabled:!0,options:{offset:[0,8]}}},je=({children:e,content:t,isOpen:n,onClose:s,placement:r,autoFocus:i,noMargin:c,className:l,noPadding:d})=>o.jsxs(o.Fragment,{children:[o.jsx($e,{noPadding:d}),o.jsx(Ht,{content:o.jsx("div",{children:t}),isOpen:n,onClose:s,minimal:!0,modifiers:Vt,popoverClassName:`bp-overrides-popover${c?" no-margin":""}`,placement:r,openOnTargetFocus:!1,enforceFocus:!1,autoFocus:i,className:l,children:e})]});je.__docgenInfo={description:"",methods:[],displayName:"Popover",props:{content:{required:!0,tsType:{name:"union",raw:"JSX.Element | string",elements:[{name:"JSX.Element"},{name:"string"}]},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},placement:{required:!1,tsType:{name:"Placement"},description:""},autoFocus:{required:!1,tsType:{name:"boolean"},description:""},noMargin:{required:!1,tsType:{name:"boolean"},description:""},noPadding:{required:!1,tsType:{name:"boolean"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const Gt=p(je)`
	overflow: hidden;
`,Ne=p.p`
	color: ${({theme:e})=>e.legacyCoreUi.colors.text};
	margin: 0;
	font-size: ${({fontSize:e})=>e??14}px;
	outline: none !important;
	text-overflow: ellipsis;
	overflow: hidden;
`;Ne.defaultProps={theme:y};const Kt=p.div`
	min-height: 30px;
	display: flex;
	align-items: center;
`,Se=({className:e,children:t,...n})=>o.jsx(Kt,{className:e,children:o.jsx(Ne,{...n,children:t})}),Qt=p(Se)`
	cursor: pointer;

	&:hover,
	&:focus {
		text-decoration: underline;
	}
`,qe=p.div`
	width: 300px;
`;qe.defaultProps={theme:y};const De=p.p`
	color: ${({theme:e})=>e.legacyCoreUi.colors.text};
	text-overflow: ellipsis;
	overflow: hidden;

	.bp4-icon {
		vertical-align: super;
	}
`;De.defaultProps={theme:y};const Wt=p.div`
	display: flex;
	align-items: center;
`,Xt=p(mt.div)`
	overflow: hidden;
	padding: 3px;
	margin-right: 2px;
	flex-shrink: 0;
`;Se.__docgenInfo={description:"",methods:[],displayName:"AggregatedDisplayText",props:{fontSize:{required:!1,tsType:{name:"number"},description:""}}};const Jt={hidden:{width:0,marginLeft:0,opacity:0},visible:{width:"auto",marginLeft:"4px",opacity:1}},K=({aggregatedDisplayValue:e,aggregationDescription:t,baseValueLabel:n,InputComponent:s,value:r,onChange:i,label:c,className:l,fontSize:d,hideButton:m,...g})=>{const[b,h]=a.useState(!1),[C,x,I]=ie(),[w,O,$]=ie(),T=(C||w)&&!b||(e==null?void 0:e.trim())===""?"visible":"hidden",u=a.useRef(null),v=a.useRef(null),f=a.useCallback(()=>{var S;h(!1),(S=v.current)==null||S.focus()},[]),j=a.useCallback(()=>h(!0),[]),E=a.useCallback(S=>{(S.key==="Enter"||S.key===" ")&&j()},[j]),R=t?o.jsx(ft,{content:t,children:o.jsx(G,{icon:"help",iconSize:10})}):null,k=o.jsxs(qe,{ref:u,children:[o.jsx("div",{tabIndex:0,onFocus:f}),o.jsx(s,{value:r,onChange:i,label:n,...g}),o.jsxs(De,{children:["Computed",R," = ",e]}),o.jsx("div",{tabIndex:0,onFocus:f})]});return o.jsx(N,{label:c,className:l,onClick:j,children:o.jsxs(Wt,{onMouseEnter:O,onMouseLeave:$,children:[o.jsx(Gt,{isOpen:b,onClose:f,content:k,children:o.jsx(Qt,{fontSize:d??14,onClick:j,tabIndex:m?0:void 0,onKeyDown:m?E:void 0,role:m?"button":void 0,children:e})}),!m&&o.jsx(Xt,{variants:Jt,initial:"unfocused",animate:T,children:o.jsx(M,{icon:"edit",onClick:j,onFocus:x,onBlur:I,variant:"minimal",buttonRef:v,size:"small"})})]})})};K.__docgenInfo={description:"",methods:[],displayName:"AggregatedInput",props:{InputComponent:{required:!0,tsType:{name:"ReactFC",raw:`React.FC<
	React.PropsWithChildren<BaseInputProps<T, TInputType>>
>`,elements:[{name:"ReactPropsWithChildren",raw:"React.PropsWithChildren<BaseInputProps<T, TInputType>>",elements:[{name:"intersection",raw:`CoreInputProps<T> &
Omit<
	React.ComponentProps<TInputType>,
	'defaultValue' | 'ref' | 'value' | 'onChange'
>`,elements:[{name:"CoreInputProps",elements:[{name:"T"}],raw:"CoreInputProps<T>"},{name:"Omit",elements:[{name:"ReactComponentProps",raw:"React.ComponentProps<TInputType>",elements:[{name:"TInputType"}]},{name:"union",raw:"'defaultValue' | 'ref' | 'value' | 'onChange'",elements:[{name:"literal",value:"'defaultValue'"},{name:"literal",value:"'ref'"},{name:"literal",value:"'value'"},{name:"literal",value:"'onChange'"}]}],raw:`Omit<
	React.ComponentProps<TInputType>,
	'defaultValue' | 'ref' | 'value' | 'onChange'
>`}]}]}]},description:""},baseValueLabel:{required:!1,tsType:{name:"string"},description:""},fontSize:{required:!1,tsType:{name:"number"},description:""},hideButton:{required:!1,tsType:{name:"boolean"},description:`Hides the edit button and makes the
display text focusable`},aggregatedDisplayValue:{required:!0,tsType:{name:"string"},description:`The aggregated value that gets displayed
to the user`},aggregationDescription:{required:!1,tsType:{name:"string"},description:`For the help tooltip of the popover to show
what went into this aggregation`},value:{required:!0,tsType:{name:"T"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T) => void",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};let Zt=0;function D(){return a.useMemo(()=>`campaign-buddy-${Zt++}`,[])}const L=q`
	background-color: ${({theme:e})=>e.input.base.backgroundColor};
	color: ${({theme:e})=>e.input.base.textColor};
`,Me=p(Te)`
	input {
		${L}
	}
`;Me.defaultProps={theme:y};const Pe=({value:e,onChange:t,label:n,id:s,rightElement:r,...i})=>{const c=a.useCallback(m=>{t(m.target.value)},[t]),l=D(),d=s??l;return o.jsx(N,{label:n,labelFor:d,children:o.jsx(Me,{value:e,onChange:c,id:d,rightElement:r,...i})})};Pe.__docgenInfo={description:"",methods:[],displayName:"Input",props:{value:{required:!0,tsType:{name:"T"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T) => void",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},rightElement:{required:!1,tsType:{name:"JSX.Element"},description:""}}};const Ee=p(yt)`
	${L}
	resize: vertical;
	min-height: 75px;
`;Ee.defaultProps={theme:y};const _e=({value:e,onChange:t,label:n,id:s,...r})=>{const i=a.useCallback(d=>t(d.target.value),[t]),c=D(),l=s??c;return o.jsx(N,{label:n,labelFor:l,children:o.jsx(Ee,{value:e,onChange:i,fill:!0,id:l,...r})})};_e.__docgenInfo={description:"",methods:[],displayName:"TextArea",props:{value:{required:!0,tsType:{name:"T"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T) => void",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const Ae=p(Te)`
	input {
		${L}
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
`;Ae.defaultProps={theme:y};const Fe=({value:e,label:t,onChange:n,onBlur:s,onKeyDown:r,id:i,...c})=>{const[l,d]=a.useState(`${e??0}`),m=D(),g=i??m,b=jt();a.useEffect(()=>{d(`${e??0}`)},[e]);const h=a.useCallback(()=>{try{const T=l.replace(/(\d+)?d(\d+)/g,(v,f,j)=>{const E=parseInt(f??"1"),R=parseInt(j);let k=0;for(let S=0;S<E;S++)k+=Math.floor(Math.random()*R)+1;return`${k}`}),u=parseFloat(gt.eval(T));if(isNaN(u))return u;n(u)}catch{}},[l,n]),C=a.useCallback(T=>{const u=parseFloat(l);isNaN(u)?(d(`${T}`),n(T)):(d(`${u+T}`),n(u+T))},[n,l]),x=a.useCallback(()=>C(1),[C]),I=a.useCallback(()=>C(-1),[C]),w=a.useCallback(T=>{T.keyCode===ht?h():T.keyCode===Tt?I():T.keyCode===xt&&x(),r==null||r(T)},[h,r,I,x]),O=a.useCallback(T=>{h(),s==null||s(T)},[h,s]),$=a.useCallback(T=>{d(T.target.value);const u=parseFloat(T.target.value);isNaN(u)||n(u)},[n]);return o.jsx(N,{label:t,labelFor:g,children:o.jsx(Ae,{value:l,onChange:$,onKeyDown:w,onBlur:O,fill:!0,id:g,className:It,rightElement:o.jsxs(me,{vertical:!0,children:[o.jsx(M,{variant:b.input.numeric.incrementButtons,onClick:x,icon:"chevron-up"}),o.jsx(M,{variant:b.input.numeric.incrementButtons,onClick:I,icon:"chevron-down"})]}),...c})})};Fe.__docgenInfo={description:"",methods:[],displayName:"NumberInput",props:{value:{required:!0,tsType:{name:"T"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: T) => void",signature:{arguments:[{type:{name:"T"},name:"value"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const Yt=q`
	box-shadow: 0 0 0 1px #137cbd, 0 0 0 3px rgb(19 124 189 / 30%),
		inset 0 1px 1px rgb(16 22 26 / 20%) !important;
`;q`
	${L};

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
		${Yt}
	}
`;const en=e=>o.jsx(K,{...e,InputComponent:Fe}),tn=e=>o.jsx(K,{...e,InputComponent:Pe}),nn=e=>o.jsx(K,{...e,InputComponent:_e});en.__docgenInfo={description:"",methods:[],displayName:"AggregatedNumberInput"};tn.__docgenInfo={description:"",methods:[],displayName:"AggregatedTextInput"};nn.__docgenInfo={description:"",methods:[],displayName:"AggregatedTextArea"};p.div`
	display: flex;
	${({justifyContent:e})=>e&&`justify-content: ${e};`}
	${({alignItems:e})=>e&&`align-items: ${e};`}
	${({gap:e})=>e&&`gap: ${e}px;`}
`;const B=p(bt)`
	background-color: ${({theme:e})=>e.legacyCoreUi.colors.background};
	max-width: 95vw;
`;B.defaultProps={theme:y};const on=p.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`,sn=p.span`
	line-height: initial;
`,U=p(vt)`
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
`;U.defaultProps={theme:y};const Le=P`
	.bp-overrides-menu-popover .bp4-menu {
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.background} !important;
	}
`;Le.defaultProps={theme:y};const rn={popoverClassName:"bp-overrides-menu-popover"};function Z({item:e,verticalPadding:t,isActive:n,iconMargin:s}){var r;return o.jsx(U,{verticalPadding:t,icon:e.icon,text:o.jsxs(on,{children:[o.jsx(sn,{children:e.displayText}),e.renderRightElement&&o.jsx("span",{children:e.renderRightElement()})]}),onClick:e.onClick,popoverProps:rn,tagName:"button",shouldDismissPopover:e.shouldCloseMenuOnClick??!0,selected:n,iconMargin:s,children:(r=e==null?void 0:e.subItems)==null?void 0:r.map(i=>o.jsx(Z,{item:i},i.displayText))})}function Be({items:e,renderMenuItem:t,onClose:n}){return o.jsx(B,{children:e.map(s=>t?o.jsx("div",{children:t({MenuItem:Z,item:s,closeMenu:n})},s.displayText):o.jsx(Z,{item:s},s.displayText))})}function an({items:e,children:t,isOpen:n,renderMenuItem:s,onClose:r}){return o.jsxs(o.Fragment,{children:[o.jsx(Le,{}),o.jsx(te,{content:o.jsx(Be,{onClose:r,renderMenuItem:s,items:e}),isOpen:n,onClose:r,placement:"bottom-start",minimal:!0,openOnTargetFocus:!1,autoFocus:!0,popoverClassName:"bp-overrides-menu-popover",children:t})]})}Be.__docgenInfo={description:"",methods:[],displayName:"Menu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"MenuItem",elements:[{name:"T"}],raw:"MenuItem<T>"}],raw:"MenuItem<T>[]"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},renderMenuItem:{required:!1,tsType:{name:"signature",type:"function",raw:"(api: MenuItemRenderApi) => React.ReactNode",signature:{arguments:[{type:{name:"MenuItemRenderApi"},name:"api"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""}}};an.__docgenInfo={description:"",methods:[],displayName:"MenuPopover",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"MenuItem",elements:[{name:"T"}],raw:"MenuItem<T>"}],raw:"MenuItem<T>[]"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},renderMenuItem:{required:!1,tsType:{name:"signature",type:"function",raw:"(api: MenuItemRenderApi) => React.ReactNode",signature:{arguments:[{type:{name:"MenuItemRenderApi"},name:"api"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""}}};const Ue=P`
	.bp-overrides-icon-popover .bp4-menu {
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.background} !important;
	}

	.bp-overrides-icon-popover .bp4-menu {
		min-width: unset !important;

		.bp4-menu-item .bp4-icon {
			margin: 0 !important;
		}
	}
`;Ue.defaultProps={theme:y};const cn={popoverClassName:"bp-overrides-icon-popover"};function ln({item:e}){return o.jsx(U,{icon:e.icon,onClick:e.onClick,popoverProps:cn,tagName:"button","aria-label":e.altText,shouldDismissPopover:e.shouldCloseMenuOnClick??!0})}function dn({items:e}){return o.jsx(B,{children:e.map(t=>o.jsx(ln,{item:t},t.altText))})}const pn=({items:e,children:t,isOpen:n,onClose:s})=>o.jsxs(o.Fragment,{children:[o.jsx(Ue,{}),o.jsx(te,{content:o.jsx(dn,{items:e}),isOpen:n,onClose:s,placement:"bottom-start",minimal:!0,openOnTargetFocus:!1,autoFocus:!0,popoverClassName:"bp-overrides-icon-popover",children:t})]});pn.__docgenInfo={description:"",methods:[],displayName:"IconMenuPopover",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"IconMenuItem"}],raw:"IconMenuItem[]"},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const ze=P`
	.bp-overrides-context-menu-popover .bp4-menu {
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.background} !important;
	}
`;ze.defaultProps={theme:y};const un={popoverClassName:"bp-overrides-context-menu-popover",hasBackdrop:!1};function He({item:e}){var t;return o.jsx(U,{icon:e.icon,text:e.displayText,onClick:e.onClick,popoverProps:un,tagName:"button",shouldDismissPopover:e.shouldCloseMenuOnClick,children:(t=e==null?void 0:e.subItems)==null?void 0:t.map(n=>o.jsx(He,{item:n},n.displayText))})}const oe=le.forwardRef(({menuItems:e,children:t,as:n,...s},r)=>o.jsxs(o.Fragment,{children:[o.jsx(ze,{}),o.jsx(Ct,{tagName:n,...s,ref:r,content:o.jsx(B,{children:e.map((i,c)=>o.jsx(He,{item:i},i.displayText??c))}),children:t})]}));oe.displayName="ContextMenu";oe.__docgenInfo={description:"",methods:[],displayName:"ContextMenu",props:{menuItems:{required:!0,tsType:{name:"Array",elements:[{name:"MenuItemType"}],raw:"MenuItemType[]"},description:""},as:{required:!1,tsType:{name:"JSX.IntrinsicElements"},description:""}},composes:["Omit"]};const z="CB_CORE_UI_LIST_ITEM",Ve=q`
	list-style: none;
	padding: 0;
	margin: 0;
`,mn=p.div`
	width: 100%;
	max-width: 100%;
	min-width: 0;
	flex-grow: 1;

	& > div {
		max-width: 100%;
	}
`,fn=p(wt)`
	&:before {
		background-color: transparent !important;
	}
`,yn=p.ul`
	${Ve}
`,gn=p.ol`
	${Ve}
`,hn=q`
	--cb-icon-color: ${({theme:e})=>e.legacyCoreUi.colors.textDisabled};
`,Ge=q`
	display: flex;
	align-items: center;
	overflow: hidden;
	height: ${({theme:e})=>e.list.item.lineHeight+e.list.item.padding.vertical}px;
	gap: ${({theme:e})=>e.list.item.spacing}px;
	padding: ${({theme:e})=>e.list.item.padding.toCss()};
	border-radius: ${({theme:e})=>e.list.item.borderRadius.toCss()};

	color: ${({theme:e,disabled:t})=>t?e.legacyCoreUi.colors.textDisabled:e.textColor};

	${({disabled:e})=>e&&hn}

	${({theme:e,isInteractive:t})=>e.list.item.backgroundColors.map((n,s,r)=>`
			:nth-child(${r.length}n + ${s+1}) {
				background-color: ${n.normal};

				${t&&`
					&:hover {
						background-color: ${n.hover};
					}

					&:focus {
						background-color: ${n.focus};
					}
	
					&:active {
						background-color: ${n.active};
					}
					`}
			}
		`)}

	${({isInteractive:e})=>e&&`
		cursor: pointer;
		user-select: none;
	`}
`,Tn=p(oe)`
	${Ge}
`,xn=p.li`
	${Ge}
`,In=p.span`
	width: 100%;
	flex-grow: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`,Ke=a.createContext({focusedId:void 0});function Qe({children:e}){const[t,n]=a.useState(void 0),s=a.useRef(null),r=a.useCallback(()=>{var l,d;if(((l=document.activeElement)==null?void 0:l.id)===t||!((d=s.current)!=null&&d.contains(document.activeElement)))return;let c=document.activeElement;for(;c&&!c.classList.contains(z);)c=c.parentElement;c&&n(c.id)},[t]),i=a.useCallback(c=>{if(c.key!=="ArrowUp"&&c.key!=="ArrowDown")return;const l=document.querySelectorAll(`.${z}`);if(l.length===0)return;let d=0;for(let b=0;b<l.length;b++)if(l[b].id===t){d=b;break}c.key==="ArrowUp"?d--:c.key==="ArrowDown"&&d++,d>=l.length&&(d=l.length-1),d<0&&(d=0);const m=l[d],g=m==null?void 0:m.id;g!==t&&(n(g),m instanceof HTMLElement&&m.focus())},[t]);return a.useEffect(()=>{var c;if(document.activeElement&&((c=s.current)!=null&&c.contains(document.activeElement)))r();else{const l=document.querySelector(`.${z}`);if(!l)return;n(l.id)}},[e,r]),o.jsx(Ke.Provider,{value:{focusedId:t},children:o.jsx("div",{onKeyDown:i,ref:s,onFocus:r,children:e})})}function bn(){const e=D(),{focusedId:t}=a.useContext(Ke);return{id:e,canReceiveFocus:t===e}}const We=a.createContext({canReceiveFocus:!0});function Y({canReceiveFocus:e,children:t}){return o.jsx(We.Provider,{value:{canReceiveFocus:e},children:t})}function vn(){return a.useContext(We).canReceiveFocus}Qe.__docgenInfo={description:"",methods:[],displayName:"ListItemFocusManager"};Y.__docgenInfo={description:"",methods:[],displayName:"ListItemFocusStateProvider",props:{canReceiveFocus:{required:!0,tsType:{name:"boolean"},description:""}}};const F={wasEventHandled:!1};function Cn({children:e,ordered:t}){const n=t?gn:yn;return o.jsx(Qe,{children:o.jsx(n,{children:e})})}const Xe=le.forwardRef(({children:e,onClick:t,disabled:n,contextMenuItems:s},r)=>{const i=a.useRef(null),c=St(i,r),{id:l,canReceiveFocus:d}=bn(),m=a.useCallback(h=>{!F.wasEventHandled&&!n&&(t==null||t(h)),F.wasEventHandled=!1},[t,n]),g=a.useCallback(h=>{h.key==="Enter"&&h.target===i.current&&m(h)},[m]),b={ref:c,isInteractive:!!t,tabIndex:d?0:-1,role:t&&"button",onClick:t&&m,onKeyDown:t&&g,className:z,id:l,disabled:n};return s?o.jsx(Y,{canReceiveFocus:d,children:o.jsx(Tn,{...b,menuItems:s,children:e})}):o.jsx(Y,{canReceiveFocus:d,children:o.jsx(xn,{...b,children:e})})});Xe.displayName="displayName";function wn({text:e}){return o.jsx(In,{children:e})}function kn({icon:e}){const t=Nt();return o.jsx(A,{icon:e,size:t.list.item.iconSize})}function Rn({children:e,as:t="div",...n}){const s=a.useCallback(()=>{F.wasEventHandled=!0},[]),r=t;return o.jsx(r,{onClick:s,onKeyDown:s,...n,children:e})}function On({value:e,onChange:t,onCommit:n,onCancel:s,placeholderText:r,selectAllOnFocus:i}){const c=a.useCallback(()=>{F.wasEventHandled=!0},[]);return o.jsx(mn,{children:o.jsx("div",{onClick:c,children:o.jsx(fn,{isEditing:!0,value:e,onChange:t,placeholder:r,onConfirm:n,onCancel:s,selectAllOnFocus:i})})})}function $n({icon:e,onClick:t}){const n=a.useCallback(()=>{F.wasEventHandled=!0,t()},[t]),s=vn();return o.jsx(Re,{icon:e,size:"small",value:!0,onChange:n,tabIndex:s?0:-1})}Cn.__docgenInfo={description:"",methods:[],displayName:"List",props:{ordered:{required:!1,tsType:{name:"boolean"},description:""}}};Xe.__docgenInfo={description:"",methods:[],displayName:"displayName",props:{onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.SyntheticEvent) => void",signature:{arguments:[{type:{name:"ReactSyntheticEvent",raw:"React.SyntheticEvent"},name:"e"}],return:{name:"void"}}},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},contextMenuItems:{required:!1,tsType:{name:"Array",elements:[{name:"MenuItem"}],raw:"MenuItem[]"},description:""}}};wn.__docgenInfo={description:"",methods:[],displayName:"ListItemText",props:{text:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};kn.__docgenInfo={description:"",methods:[],displayName:"ListItemIcon",props:{icon:{required:!0,tsType:{name:"union",raw:"ImageIcon | BlueprintIcon | IconName",elements:[{name:"ImageIcon"},{name:"BlueprintIcon"},{name:"IconName"}]},description:""}}};Rn.__docgenInfo={description:`Any clicks within the children of this component
will not propagate to the parent ListItem but *will*
propagate to other ancestors. Not required for
ListItemIconButton`,methods:[],displayName:"ListItemShallowClickArea",props:{as:{required:!1,tsType:{name:"JSX.IntrinsicElements"},description:"",defaultValue:{value:"'div'",computed:!1}}},composes:["Omit"]};On.__docgenInfo={description:"",methods:[],displayName:"ListItemInput",props:{value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},onCommit:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},placeholderText:{required:!1,tsType:{name:"string"},description:""},selectAllOnFocus:{required:!1,tsType:{name:"boolean"},description:""}}};$n.__docgenInfo={description:"",methods:[],displayName:"ListItemIconButton",props:{icon:{required:!0,tsType:{name:"IconName"},description:""},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const jn=p.div`
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
`,Je=p.div`
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
`;Je.defaultProps={theme:y};const Nn=p.div`
	padding: 12px;

	${({scrollStyle:e})=>e==="content"&&`
		overflow: auto;
	`}
`,Ze=p.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px;

	& > h1 {
		color: ${({theme:e})=>e.legacyCoreUi.colors.text};
		margin: 0;
	}
`;Ze.defaultProps={theme:y};const Sn=p.div`
	display: flex;
	justify-content: flex-end;
	padding: 12px;
`,qn=({title:e,onClose:t,isOpen:n,footerButtons:s,scrollStyle:r,children:i})=>{const c=a.useCallback(l=>{l.stopPropagation()},[]);return o.jsx(ge,{isOpen:n,onClose:t,children:o.jsx(jn,{onClick:t,scrollStyle:r??"content",children:o.jsxs(Je,{className:kt,onClick:c,scrollStyle:r??"content",children:[o.jsxs(Ze,{children:[o.jsx("h1",{children:e}),o.jsx(M,{icon:"cross",onClick:t,variant:"minimal"})]}),o.jsx(Nn,{scrollStyle:r??"content",children:i}),o.jsx(Sn,{children:s.map(l=>o.jsx(M,{variant:l.style,onClick:l.onClick,isLoading:l.isLoading,children:l.text},l.text))})]})})})};qn.__docgenInfo={description:"",methods:[],displayName:"Modal",props:{title:{required:!0,tsType:{name:"string"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""},footerButtons:{required:!0,tsType:{name:"Array",elements:[{name:"ModalButton"}],raw:"ModalButton[]"},description:""},scrollStyle:{required:!1,tsType:{name:"union",raw:"'overlay' | 'content'",elements:[{name:"literal",value:"'overlay'"},{name:"literal",value:"'content'"}]},description:""}}};const se=P`
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
`;se.defaultProps={theme:y};const re=p(M)`
	${({theme:e})=>H(e.select.button)}
`;re.defaultProps={theme:y};const Ye=p.i`
	color: ${({theme:e})=>e.select.textColor};
	text-align: center;
	width: 100%;
	display: block;
	padding: 4px 0;
`;Ye.defaultProps={theme:y};function Q(e){const t=a.useCallback(({items:r,itemsParentRef:i,renderItem:c})=>{const l=r.map(c).filter(d=>d!=null);return o.jsx(B,{ulRef:i,children:r.length===0?o.jsx(Ye,{children:"No results"}):l})},[]),n=a.useMemo(()=>new Set((e==null?void 0:e.map(r=>r.id))??[]),[e]),s=a.useCallback((r,{handleClick:i,modifiers:c})=>o.jsx(U,{active:c.active,onClick:i,text:r.displayValue,icon:n.has(r.id)?"tick":"blank"},r.id),[n]);return{renderMenu:t,renderItem:s}}function W(e){return a.useMemo(()=>({minimal:!0,portalClassName:"campaign-buddy-select",onClosing:()=>e(""),enforceFocus:!1,shouldReturnFocusOnClose:!1}),[e])}const Dn=Ie.ofType();function Mn({options:e,value:t,onChange:n,label:s,placeholder:r,isDisabled:i}){const c=D(),[l,d]=a.useState(""),m=a.useMemo(()=>t&&[t],[t]),{renderMenu:g,renderItem:b}=Q(m),h=W(d),C=a.useMemo(()=>new xe(e,{keys:["displayValue"]}),[e]),x=a.useCallback(w=>d(w),[]),I=a.useMemo(()=>l?C.search(l).map(w=>w.item):e,[l,e,C]);return o.jsxs(N,{label:s,labelFor:c,children:[o.jsx(se,{}),o.jsx(Dn,{items:I,onItemSelect:n,itemListRenderer:g,itemRenderer:b,fill:!0,popoverProps:h,query:l,onQueryChange:x,disabled:i,children:o.jsx(re,{variant:"minimal",rightIcon:"caret-down",fill:!0,id:c,children:t!=null&&t.displayValue?o.jsx("span",{children:t==null?void 0:t.displayValue}):o.jsx("i",{children:r??"Select an option"})})})]})}Mn.__docgenInfo={description:"",methods:[],displayName:"Select",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},description:""},value:{required:!0,tsType:{name:"union",raw:"IOption<TData> | undefined",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"},{name:"undefined"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: IOption<TData>) => void",signature:{arguments:[{type:{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"},name:"value"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},isDisabled:{required:!1,tsType:{name:"boolean"},description:""}}};const ee=p(he)`
	.bp4-spinner-head {
		stroke: ${({theme:e})=>e.legacyCoreUi.colors.primary} !important;
	}
`;ee.defaultProps={theme:y};const Pn=p.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`,En={fullPage:45,textInline:15},V=({fullHeight:e,size:t})=>{const n=typeof t=="number"?t:En[t];return e?o.jsx(Pn,{children:o.jsx(ee,{size:n})}):o.jsx(ee,{size:n})};V.__docgenInfo={description:"",methods:[],displayName:"Spinner",props:{size:{required:!0,tsType:{name:"union",raw:"number | SpinnerSize",elements:[{name:"number"},{name:"union",raw:"keyof typeof spinnerSizes",elements:[{name:"literal",value:"fullPage"},{name:"literal",value:"textInline"}]}]},description:""},fullHeight:{required:!1,tsType:{name:"boolean"},description:""}}};const _n=Ie.ofType();function An({fetchOptions:e,value:t,onChange:n,initialOptions:s,placeholder:r,label:i,disabled:c,isLoading:l}){const d=D(),m=a.useMemo(()=>t&&[t],[t]),{renderMenu:g,renderItem:b}=Q(m),[h,C]=a.useState(""),[x,I]=a.useState(!1),w=a.useRef(),O=W(C),[$,T]=a.useState(s??[]),u=be(e),v=a.useCallback(async R=>{const k=await u(R);T(k),I(!1)},[u]),f=ve(v,750);a.useEffect(()=>{async function R(){I(!0),w.current=u("");const k=await w.current;T(k),I(!1)}R()},[u]);const j=a.useCallback(async R=>{var k;(k=w.current)==null||k.cancel(),I(!0),C(R),f(R)},[f]),E=a.useMemo(()=>({rightElement:x||l?o.jsx(V,{size:"textInline"}):void 0,disabled:c}),[x,c,l]);return o.jsxs(N,{label:i,labelFor:d,children:[o.jsx(se,{}),o.jsx(_n,{items:$??s??[],onItemSelect:n,itemListRenderer:g,itemRenderer:b,fill:!0,popoverProps:O,onQueryChange:j,query:h,inputProps:E,noResults:o.jsx("i",{children:"No results"}),disabled:c,children:o.jsx(re,{variant:"minimal",rightIcon:l?o.jsx(V,{size:"textInline"}):"caret-down",fill:!0,id:d,disabled:c,children:t!=null&&t.displayValue?o.jsx("span",{children:t==null?void 0:t.displayValue}):o.jsx("i",{children:r??"Select an option"})})})]})}An.__docgenInfo={description:"",methods:[],displayName:"AsyncSelect",props:{fetchOptions:{required:!0,tsType:{name:"signature",type:"function",raw:"(query: string | undefined) => Promise<IOption<TData>[]>",signature:{arguments:[{type:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},name:"query"}],return:{name:"Promise",elements:[{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"}],raw:"Promise<IOption<TData>[]>"}}},description:""},value:{required:!0,tsType:{name:"union",raw:"IOption<TData> | undefined",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"},{name:"undefined"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: IOption<TData>) => void",signature:{arguments:[{type:{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"},name:"value"}],return:{name:"void"}}},description:""},initialOptions:{required:!1,tsType:{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:""}}};const Fn=Rt.ofType(),ae=p(Fn)`
	div.bp4-input {
		${L}
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
`;ae.defaultProps={theme:y};function Ln({options:e,value:t,onChange:n,label:s,placeholder:r}){const i=D(),[c,l]=a.useState(""),[d,m]=a.useState(e),g=a.useRef(e),{renderMenu:b,renderItem:h}=Q(t),C=W(l),x=a.useMemo(()=>new xe(e,{keys:["displayValue"]}),[e]),I=a.useCallback(u=>l(u),[]),w=a.useCallback(u=>{const v=t==null?void 0:t.findIndex(f=>f.id===u.id);if(v!==void 0&&v!==-1){const f=[...t??[]];f.splice(v,1),n(f,[],[u],t??[]);return}if(!t){n([u],[u],[],[]);return}n([...t,u],[u],[],t)},[n,t]),O=a.useCallback((u,v)=>{const f=[...t??[]];f.splice(v,1),n(f,[],[u],t??[])},[n,t]);a.useEffect(()=>{g.current=d},[d]),a.useEffect(()=>{function u(){return c?x.search(c).map(f=>f.item):e}const v=u();Ce(v,g.current)||m(v)},[c,x,e]);const $=a.useMemo(()=>({inputProps:{id:i,autoComplete:"off"}}),[i]),T=a.useCallback(u=>u.displayValue,[]);return o.jsx(N,{label:s,labelFor:i,children:o.jsx(ae,{tagInputProps:$,items:d,selectedItems:t,onItemSelect:w,onRemove:O,query:c,onQueryChange:I,itemRenderer:h,itemListRenderer:b,tagRenderer:T,popoverProps:C,placeholder:r})})}Ln.__docgenInfo={description:"",methods:[],displayName:"MultiSelect",props:{options:{required:!0,tsType:{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},description:""},value:{required:!0,tsType:{name:"union",raw:"IOption<TData>[] | undefined",elements:[{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},{name:"undefined"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(
	value: IOption<TData>[],
	added: IOption<TData>[],
	removed: IOption<TData>[],
	previousValue: IOption<TData>[]
) => void`,signature:{arguments:[{type:{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},name:"value"},{type:{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},name:"added"},{type:{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},name:"removed"},{type:{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},name:"previousValue"}],return:{name:"void"}}},description:""},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""}}};function Bn(e,t){const[n,s]=a.useState(""),[r,i]=a.useState(!1),[c,l]=a.useState(e??[]),d=a.useRef(),m=a.useRef();a.useEffect(()=>{d.current=c},[c]);const g=be(t),b=a.useCallback(async x=>{const I=await g(x);l(I),i(!1)},[g]),h=ve(b,750);a.useEffect(()=>{async function x(){i(!0),m.current=g("");const I=await m.current;i(!1),Ce(d.current,I)||l(I)}x()},[g]);const C=a.useCallback(async x=>{var I;if(!x&&e)return l(e);(I=m.current)==null||I.cancel(),i(!0),s(x),h(x)},[h]);return{query:n,setQuery:C,isLoading:r,options:c}}function Un({value:e,onChange:t,label:n,placeholder:s,initialOptions:r,fetchOptions:i,isLoading:c,disabled:l}){const d=D(),{renderMenu:m,renderItem:g}=Q(e),{query:b,setQuery:h,options:C,isLoading:x}=Bn(r,i),I=W(h),w=a.useCallback(u=>{const v=e==null?void 0:e.findIndex(f=>f.id===u.id);if(v!==void 0&&v!==-1){const f=[...e??[]];f.splice(v,1),t(f,[],[u],e??[]);return}if(!e){t([u],[u],[],[]);return}t([...e,u],[u],[],e)},[t,e]),O=a.useCallback((u,v)=>{const f=[...e??[]];f.splice(v,1),t(f,[],[u],e??[])},[t,e]),$=a.useMemo(()=>({inputProps:{id:d,autoComplete:"off",disabled:l},rightElement:c||x?o.jsx(V,{size:"textInline"}):o.jsx(G,{icon:"search"})}),[d,c,x,l]),T=a.useCallback(u=>u.displayValue,[]);return o.jsx(N,{label:n,labelFor:d,children:o.jsx(ae,{tagInputProps:$,items:C??r??[],selectedItems:e,onItemSelect:w,onRemove:O,query:b,onQueryChange:h,itemRenderer:g,itemListRenderer:m,tagRenderer:T,popoverProps:I,placeholder:s,noResults:o.jsx("i",{children:"No results"}),resetOnQuery:!1})})}Un.__docgenInfo={description:"",methods:[],displayName:"AsyncMultiSelect",props:{fetchOptions:{required:!0,tsType:{name:"signature",type:"function",raw:"(query: string | undefined) => Promise<IOption<TData>[]>",signature:{arguments:[{type:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},name:"query"}],return:{name:"Promise",elements:[{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"}],raw:"Promise<IOption<TData>[]>"}}},description:""},value:{required:!0,tsType:{name:"union",raw:"IOption<TData>[] | undefined",elements:[{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},{name:"undefined"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(
	value: IOption<TData>[],
	added: IOption<TData>[],
	removed: IOption<TData>[],
	previousValue: IOption<TData>[]
) => void`,signature:{arguments:[{type:{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},name:"value"},{type:{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},name:"added"},{type:{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},name:"removed"},{type:{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},name:"previousValue"}],return:{name:"void"}}},description:""},initialOptions:{required:!1,tsType:{name:"Array",elements:[{name:"IOption",elements:[{name:"TData"}],raw:"IOption<TData>"}],raw:"IOption<TData>[]"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:""},isLoading:{required:!1,tsType:{name:"boolean"},description:""}}};const et=p(Ot)`
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
`;et.defaultProps={theme:y};const zn=({value:e,onChange:t,label:n,...s})=>{const r=a.useCallback(i=>t(i.target.checked),[t]);return o.jsx(et,{checked:e,onChange:r,label:n,...s})};zn.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{label:{required:!1,tsType:{name:"string"},description:""}},composes:["Omit"]};const Hn=p($t)`
	background-color: ${({theme:e})=>e.legacyCoreUi.colors.primary};
`;Hn.defaultProps={theme:y};const Vn=P`
	.bp4-toast {
		background-color: ${({theme:e})=>e.legacyCoreUi.colors.background};
		color: ${({theme:e})=>e.legacyCoreUi.colors.text};
	}

	.bp4-button {
		${_t}
	}
`,tt=a.createContext({current:null});function Gn({children:e}){const t=a.useRef(null),n=a.useCallback(s=>{t.current=s},[]);return o.jsxs(o.Fragment,{children:[o.jsx(Vn,{}),o.jsx(Pt,{position:"bottom-right",ref:n}),o.jsx(tt.Provider,{value:t,children:e})]})}function no(){const e=a.useContext(tt);return{showToast:a.useCallback(({message:n,intent:s})=>{const r=e.current;if(!r)throw new Error("Toaster context not provided. Ensure that ToasterProvider is present and that there is only one copy of core-ui in use (e.g. core-ui is added as a peer dependency)");const i=r.show({message:n,intent:ce(s)});return({message:c,intent:l})=>{r.show({message:c,intent:ce(l)},i)}},[e])}}function ce(e){return e==="normal"||!e?"none":"danger"}Gn.__docgenInfo={description:"",methods:[],displayName:"ToasterProvider"};export{en as A,M as B,oe as C,N as F,Pe as I,zt as L,an as M,Fe as N,je as P,Mn as S,_e as T,nn as a,tn as b,Un as c,An as d,A as e,Cn as f,Xe as g,kn as h,wn as i,Rn as j,$n as k,On as l,pn as m,qn as n,Ln as o,V as p,zn as q,Gn as r,Re as s,no as u};
