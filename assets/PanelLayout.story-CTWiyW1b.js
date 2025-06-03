const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./gi-BFAegp5r.js","./iconBase-DRO9aDiR.js","./index-tnPESBdE.js","./io5-Bzo-0pZI.js"])))=>i.map(i=>d[i]);
import{j as a}from"./jsx-runtime-PJfywvQB.js";import{H as b,C as K,W as lt}from"./styled-components.browser.esm-CuL3HyEV.js";import{u as ut,a as ht,b as pt,c as ft,g as mt,D as gt,H as vt}from"./index-q1RHaYn3.js";import{c as q,T as bt}from"./index-GGm2kZn3.js";import{r as d,R as $}from"./index-tnPESBdE.js";import{r as yt}from"./index-BJt650PE.js";import{i as ie}from"./index-C4WGByT4.js";import{u as je}from"./index-DwWHXmyK.js";import{_ as Y}from"./iframe-DLiZLbIA.js";import{t as S,v as xt,a as L,b as Pt,c as Ct,d as It,C as wt}from"./CompositeControl-Djc9f6Ar.js";import"./parchmentTheme-CF6Ki9yW.js";import"./index-ChYhBiAs.js";import{u as me}from"./useUpdatingRef-CQrjiaKT.js";import{u as Se}from"./useResizeObserver-Dyd7CEVH.js";import{u as De}from"./useCombinedRefs-G3-tKQwR.js";import{M as Tt}from"./useShowToast-xIu4UuDl.js";import{u as ge}from"./fuse.esm-DpGxg_dX.js";import"./index-aBkx2qY1.js";import"./navigateObject-ZMXbUPar.js";import"./index-CNLxx85X.js";import"./inheritsLoose-XbxvykFZ.js";function ve(e,t,n){const r=d.useRef(e);r.current=e,d.useEffect(()=>{let i=null;return t&&(i=setTimeout(()=>r.current(),n)),()=>{i&&clearTimeout(i)}},[n,t])}function zt(e){const n=ut().getMonitor(),[r,i]=ht(n,e);return d.useEffect(()=>n.subscribeToOffsetChange(i)),d.useEffect(()=>n.subscribeToStateChange(i)),r}function re(e){return e&&Array.isArray(e.children)}function $e(e){return e&&Array.isArray(e.sizes)}function Oe(e){return e.kind==="panelLayout"&&re(e)&&$e(e)}function Rt(e){return e.kind==="panelRow"&&re(e)&&$e(e)}function Ne(e){return e.kind==="panel"&&re(e)}function Mt(e){return e.kind==="pane"&&typeof e.location=="string"}function kt(e,t,n){if(e.length<=1)return[];const r=[...e],i=e[t];if(typeof n=="number"&&n>=0&&n!==t)r[n]+=i,r.splice(t,1);else{r.splice(t,1);const o=i/r.length;for(let s=0;s<r.length;s++)r[s]+=o}return r}function jt(e,t,n){if(e.length===0)return[100];const r=[...e],i=[];typeof n=="number"&&n>=0&&n<e.length?i.push(n):(t>0&&i.push(t-1),t<e.length&&i.push(t));const s=i.reduce((c,l)=>c+e[l],0)/(i.length+1);for(const c of i)r[c]=s;return r.splice(t,0,s),r}class St{constructor(){this.isInTransaction=()=>!!this.currentTransaction,this.startTransaction=()=>{this.currentTransaction||(this.currentTransaction={eventIds:new Set,commitEvents:[],dataMutations:[],dataCleanups:[],dataMutationRollbacks:[]})},this.getId=()=>this.id,this.addCommitEvent=t=>{if(!this.currentTransaction){t();return}const n=q();return this.currentTransaction.eventIds.add(n),this.currentTransaction.commitEvents.push(t),n},this.addDataMutation=(t,n)=>{if(!this.currentTransaction){t();return}const r=q();return this.currentTransaction.eventIds.add(r),this.currentTransaction.dataMutations.push(t),this.currentTransaction.dataMutationRollbacks.push(n),r},this.addDataCleanup=t=>{if(!this.currentTransaction){t();return}const n=q();return this.currentTransaction.eventIds.add(n),this.currentTransaction.dataCleanups.push(t),n},this.addNormalizer=t=>{this.normalizers.push(t)},this.removeNormalizer=t=>{const n=this.normalizers.indexOf(t);n!==-1&&this.normalizers.splice(n,1)},this.hasPendingEvents=t=>{var n;return!!(t&&((n=this.currentTransaction)!=null&&n.eventIds.has(t)))},this.commit=()=>{if(!this.currentTransaction)return;for(const n of this.currentTransaction.dataMutations)n();for(;this.currentTransaction.dataCleanups.length>0;){this.currentTransaction.eventIds=new Set,this.currentTransaction.dataMutations=[];for(const n of this.currentTransaction.dataCleanups)n();this.currentTransaction.dataCleanups=[];for(const n of this.currentTransaction.dataMutations)n()}const{commitEvents:t}=this.currentTransaction;this.currentTransaction=void 0;for(const n of t)n()},this.rollback=()=>{if(this.currentTransaction){for(const t of this.currentTransaction.dataMutationRollbacks)t();this.currentTransaction=void 0}},this.normalizers=[],this.id=q()}}class D{constructor(t,n){this.addNormalization=r=>{this.normalizations.push(r)},this.getValue=(r="auto")=>r==="auto"&&this.transactionManager.isInTransaction()||r==="uncommitted"?this.uncommittedValue:this.committedValue,this.setValue=r=>{const i=!this.transactionManager.isInTransaction();i&&this.transactionManager.startTransaction(),this.uncommittedValue=r,this.transactionManager.hasPendingEvents(this.pendingMutationId)||(this.pendingMutationId=this.transactionManager.addDataMutation(()=>{this.committedValue=be(this.uncommittedValue),this.pendingMutationId=void 0},()=>{this.uncommittedValue=be(this.committedValue),this.pendingMutationId=void 0})),this.transactionManager.hasPendingEvents(this.pendingNormalizationId)||(this.pendingNormalizationId=this.transactionManager.addDataCleanup(()=>{this.pendingNormalizationId=void 0;for(const o of this.normalizations)o()})),this.transactionManager.hasPendingEvents(this.pendingCommitEventId)||(this.pendingCommitEventId=this.transactionManager.addCommitEvent(()=>{this.pendingCommitEventId=void 0;for(const o of this.observers)o(this.committedValue)})),i&&this.transactionManager.commit()},this.observe=r=>{this.observers.push(r)},this.unobserve=r=>{const i=this.observers.indexOf(r);i!==-1&&this.observers.splice(i,1)},this.uncommittedValue=t,this.committedValue=t,this.transactionManager=n,this.observers=[],this.normalizations=[]}}class ne extends D{constructor(){super(...arguments),this.remove=t=>{this.splice(t,1)},this.insert=(t,n)=>{n===void 0?this.push(t):this.splice(n,0,t)},this.splice=(t,n,...r)=>{const i=[...this.getValue()];r.length===0?i.splice(t,n):i.splice(t,n,...r),this.setValue(i)},this.push=t=>{const n=[...this.getValue()];n.push(t),this.setValue(n)}}}class Ee{constructor(t){this.watchProperties=(...n)=>{for(const r of n)this.properties.push(r)},this.observe=n=>{for(const r of this.properties)r.observe(n);return()=>{for(const r of this.properties)r.unobserve(n)}},this.properties=[],this.transactionManager=t}}function be(e){return Array.isArray(e)?[...e]:e===null?e:typeof e=="object"?{...e}:e}class Dt extends Ee{constructor(t){super(t),this.getRegistry=()=>this.registry.getValue(),this.getById=n=>this.registryMap[n],this.remove=n=>{const r=this.registry.getValue().findIndex(i=>i.getId()===n);r!==-1&&this.registry.remove(r),delete this.registryMap[n]},this.add=n=>{this.registry.insert(n),this.registryMap[n.getId()]=n},this.registry=new ne([],t),this.registryMap={},this.watchProperties(this.registry)}}const te={};class _e extends Ee{constructor(t,n){super(t),this.transact=r=>{if(this.transactionManager.isInTransaction()){r();return}this.transactionManager.startTransaction();try{r()===!1?this.transactionManager.rollback():this.transactionManager.commit()}catch{this.transactionManager.rollback()}},this.getId=()=>this.id,this.getParent=()=>this.parent.getValue(),this.getSibling=(r="after")=>{const i=this.getParent();if(!i)return;const o=i.getChildren(),s=o.indexOf(this);return r==="before"?o[s-1]:o[s+1]},this.setParent=r=>{this.parent.setValue(r)},te[t.getId()]||(te[t.getId()]=new Dt(t)),this.modelRegistry=te[t.getId()],this.id=q(),this.parent=new D(n,this.transactionManager),this.hasEverHadParent=!!n,this.modelRegistry.add(this),this.parent.addNormalization(()=>{this.parent.getValue()&&(this.hasEverHadParent=!0),!this.parent.getValue()&&this.hasEverHadParent&&this.modelRegistry.remove(this.id)}),this.watchProperties(this.parent)}}class oe extends _e{constructor(t,n,r=!0){super(t,n),this.getChildren=()=>this.children.getValue(),this.getSizes=()=>this.sizes.getValue(),this.setSizes=o=>{this.trackSizes&&this.sizes.setValue(o)},this.replaceChildren=(o,s)=>{this.transact(()=>{const c=this.children.getValue(),l=this.sizes.getValue(),u=c.findIndex(y=>y.getId()===o);if(u===-1)return;c[u].setParent(void 0);const m=l[u]/s.length,v=Array.from(Array(s.length)).map(()=>m);this.sizes.splice(u,1,...v),this.children.splice(u,1,...s);for(const y of s)y.setParent(this)})},this.removeChild=(o,s)=>{this.transact(()=>{const c=this.children.getValue(),l=c.findIndex(g=>g.getId()===s),u=c.findIndex(g=>g.getId()===o);if(u===-1)return;this.children.getValue()[u].setParent(void 0),this.children.remove(u),this.trackSizes&&this.sizes.setValue(kt(this.sizes.getValue(),u,l))})},this.addChild=(o,{takeSizeFromTargetId:s,beforeTargetId:c}={})=>{this.transact(()=>{const l=this.children.getValue(),u=l.findIndex(g=>g.getId()===s);let h=l.findIndex(g=>g.getId()===c);h===-1&&(h=this.children.getValue().length),this.children.insert(o,h),o.setParent(this),this.trackSizes&&this.sizes.setValue(jt(this.sizes.getValue(),h,u))})},this.init=(o,s)=>{this.children.setValue(o),this.sizes.setValue(s)},this.children=new ne([],this.transactionManager),this.sizes=new ne([],this.transactionManager),this.children.addNormalization(()=>{var o;this.children.getValue().length===0&&((o=this.parent.getValue())==null||o.removeChild(this.getId()));for(const s of this.getChildren()){const c=s.getParent();!c||c===this||s.setParent(this)}});const i=()=>{if(!this.trackSizes)return;const o=this.children.getValue(),s=this.sizes.getValue();if(o.length!==s.length){console.warn("Number of sizes does not match number of children. This is invalid, sizes will be overwritten to match children.",o,s);const c=100/o.length,l=o.map(()=>c);this.sizes.setValue(l)}};this.children.addNormalization(i),this.sizes.addNormalization(i),this.trackSizes=r,this.watchProperties(this.children,this.sizes)}}const H=class H extends oe{constructor(t,n,r){if(super(t,r),this.openPane=i=>{this.transact(()=>{this.getFirstPanel(this).addPane({kind:"pane",...i})})},this.addFromDrop=(i,o)=>{this.transact(()=>{const s=this.popOrCreatePane(i),c=new A(this.transactionManager),l=new R(this.transactionManager);c.addPanelFromModel(l),l.addPaneFromModel(s),this.addChild(c,{beforeTargetId:o})})},this.removeRow=(i,o)=>{this.removeChild(i,o)},this.addRow=(i,o)=>{this.addChild(new A(this.transactionManager,i),o)},this.addRowFromModel=(i,o)=>{this.addChild(i,o)},this.toJson=()=>({children:this.getChildren().map(i=>i.toJson()),sizes:[...this.getSizes()],kind:"panelLayout"}),this.popOrCreatePane=i=>{var s;const o=i.paneId&&this.modelRegistry.getById(i.paneId);return o instanceof z?((s=o.getParent())==null||s.removePane(o.getId()),o):new z(this.transactionManager,{location:i.location,kind:"pane"})},this.getFirstPanel=i=>{i.getChildren().length||this.addRow({kind:"panelRow",children:[],sizes:[]});const o=i.getChildren()[0];o.getChildren().length||o.addPanel({kind:"panel",children:[]});const s=o.getChildren()[0];return s instanceof H?this.getFirstPanel(s):s},n&&!Oe(n))throw new Error("First constructor argument must be layout");this.init((n==null?void 0:n.children.map(i=>new A(this.transactionManager,i,this)))??[],(n==null?void 0:n.sizes)??[])}};H.create=t=>new H(new St,t);let _=H;class A extends oe{constructor(t,n,r){if(super(t,r),this.addFromDrop=(i,o)=>{this.transact(()=>{const s=this.popOrCreatePane(i),c=new R(this.transactionManager);c.addPaneFromModel(s),this.addChild(c,{beforeTargetId:o})})},this.removePanel=(i,o)=>{this.removeChild(i,o)},this.addPanel=(i,o)=>{this.addChild(new R(this.transactionManager,i,this),o)},this.addPanelFromModel=(i,o)=>{this.addChild(i,o)},this.addLayoutFromModel=(i,o)=>{this.addChild(i,o)},this.toJson=()=>({children:this.getChildren().map(i=>i.toJson()),sizes:[...this.getSizes()],kind:"panelRow"}),this.popOrCreatePane=i=>{var s;const o=i.paneId&&this.modelRegistry.getById(i.paneId);return o instanceof z?((s=o.getParent())==null||s.removePane(o.getId()),o):new z(this.transactionManager,{location:i.location,kind:"pane"})},n&&!Rt(n))throw new Error("First constructor argument must be row");this.children.addNormalization(()=>{const i=this.getChildren(),o=this.getParent();if(i.length!==1||!o)return;const s=i[0];if(!(s instanceof _))return;const c=s.getChildren();c.length!==0&&o.replaceChildren(this.getId(),c)}),this.init((n==null?void 0:n.children.map(i=>{if(Ne(i))return new R(this.transactionManager,i,this);if(Oe(i))return new _(this.transactionManager,i,this);throw new Error("Unexpected child of row")}))??[],(n==null?void 0:n.sizes)??[])}}class R extends oe{constructor(t,n,r){var i;if(super(t,r,!1),this.getActiveTabId=()=>this.activeTabId.getValue(),this.setActiveTabId=o=>this.activeTabId.setValue(o),this.addHorizontalFromDrop=(o,s)=>{this.transact(()=>{const c=this.getParent();if(!c)return;const l=this.popOrCreatePane(o),u=new R(this.transactionManager);u.addChild(l);const h=s==="left"?this:this.getSibling("after");c.addPanelFromModel(u,{beforeTargetId:h==null?void 0:h.getId(),takeSizeFromTargetId:this.getId()}),l.focus()})},this.addVerticalFromDrop=(o,s)=>{this.transact(()=>{const c=this.getParent();if(!c)return;const l=new _(this.transactionManager);c.replaceChildren(this.getId(),[l]);const u=new A(this.transactionManager),h=new A(this.transactionManager);l.addRowFromModel(u),l.addRowFromModel(h);const g=new R(this.transactionManager),m=this.popOrCreatePane(o);g.addChild(m),s==="top"?(u.addPanelFromModel(g),h.addPanelFromModel(this)):(u.addPanelFromModel(this),h.addPanelFromModel(g)),m.focus()})},this.addToTabBarFromDrop=(o,s)=>{this.transact(()=>{const c=this.popOrCreatePane(o);this.addChild(c,{beforeTargetId:s}),c.focus()})},this.removePane=o=>{this.removeChild(o)},this.addPaneFromModel=(o,s)=>{this.addChild(o,{beforeTargetId:s})},this.addPane=(o,s)=>{this.addChild(new z(this.transactionManager,o,this),{beforeTargetId:s})},this.toJson=()=>({children:this.getChildren().map(o=>o.toJson()),kind:"panel"}),this.popOrCreatePane=o=>{var c;const s=o.paneId&&this.modelRegistry.getById(o.paneId);return s instanceof z?((c=s.getParent())==null||c.removePane(s.getId()),s):new z(this.transactionManager,{location:o.location,kind:"pane"},this)},n&&!Ne(n))throw new Error("First constructor argument must be panel");this.init((n==null?void 0:n.children.map(o=>new z(this.transactionManager,o,this)))??[],[]),this.activeTabId=new D((i=this.getChildren()[0])==null?void 0:i.getId(),this.transactionManager),this.children.addNormalization(()=>{const o=this.getChildren(),s=this.activeTabId.getValue();if(o.length===0)return;o.find(l=>l.getId()===s)||this.setActiveTabId(o[0].getId())}),this.watchProperties(this.activeTabId)}}class z extends _e{constructor(t,n,r){if(super(t,r),this.close=()=>{this.transact(()=>{const i=this.getParent();i&&i.removeChild(this.getId())})},this.focus=()=>{const i=this.getParent();i&&i.setActiveTabId(this.getId())},this.setTabIcon=i=>{this.tabIcon.setValue(i)},this.getTabIcon=()=>this.tabIcon.getValue(),this.setLocation=i=>{this.location.setValue(i)},this.setTabTitle=i=>{this.tabTitle.setValue(i)},this.setParameters=i=>{this.parameters.setValue(i)},this.getTabTitle=()=>this.tabTitle.getValue(),this.getLocation=()=>this.location.getValue(),this.getParameters=()=>this.location.getValue(),this.toJson=()=>({location:this.location.getValue(),parameters:this.location.getValue(),kind:"pane"}),n&&!Mt(n))throw new Error("First constructor argument must be pane");this.location=new D(n.location,this.transactionManager),this.tabTitle=new D("Campaign Buddy",this.transactionManager),this.tabIcon=new D({kind:"icon",icon:"d20"},this.transactionManager),this.parameters=new D(n.parameters,this.transactionManager),this.watchProperties(this.location,this.tabTitle,this.tabIcon,this.parameters)}}var Le=function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,i){r.__proto__=i}||function(r,i){for(var o in i)i.hasOwnProperty(o)&&(r[o]=i[o])},e(t,n)};return function(t,n){e(t,n);function r(){this.constructor=t}t.prototype=n===null?Object.create(n):(r.prototype=n.prototype,new r)}}(),se="html",ae="svg",$t="http://www.w3.org/2000/svg",Ot=function(e,t){if(t===se)return e instanceof HTMLElement;if(t===ae)return e instanceof SVGElement;throw new Error('Unrecognized element type "'+t+'" for validateElementType.')},Ve=function(e,t){var n={},r,i,o;if(e===se)o=document.createElement("div");else if(e===ae)o=document.createElementNS($t,"g");else throw new Error('Invalid element type "'+e+'" for createPortalNode: must be "html" or "svg".');if(t&&typeof t=="object")for(var s=0,c=Object.entries(t.attributes);s<c.length;s++){var l=c[s],u=l[0],h=l[1];o.setAttribute(u,h)}var g={element:o,elementType:e,setPortalProps:function(m){n=m},getInitialPortalProps:function(){return n},mount:function(m,v){if(v!==i){if(g.unmount(),m!==r&&!Ot(m,e))throw new Error('Invalid element type for portal: "'+e+'" portalNodes must be used with '+e+" elements, but OutPortal is within <"+m.tagName+">.");m.replaceChild(g.element,v),r=m,i=v}},unmount:function(m){m&&m!==i||r&&i&&(r.replaceChild(i,g.element),r=void 0,i=void 0)}};return g},Nt=function(e){Le(t,e);function t(n){var r=e.call(this,n)||this;return r.addPropsChannel=function(){Object.assign(r.props.node,{setPortalProps:function(i){r.setState({nodeProps:i})}})},r.state={nodeProps:r.props.node.getInitialPortalProps()},r}return t.prototype.componentDidMount=function(){this.addPropsChannel()},t.prototype.componentDidUpdate=function(){this.addPropsChannel()},t.prototype.render=function(){var n=this,r=this.props,i=r.children,o=r.node;return yt.createPortal(d.Children.map(i,function(s){return d.isValidElement(s)?d.cloneElement(s,n.state.nodeProps):s}),o.element)},t}(d.PureComponent),Et=function(e){Le(t,e);function t(n){var r=e.call(this,n)||this;return r.placeholderNode=d.createRef(),r.passPropsThroughPortal(),r}return t.prototype.passPropsThroughPortal=function(){var n=Object.assign({},this.props,{node:void 0});this.props.node.setPortalProps(n)},t.prototype.componentDidMount=function(){var n=this.props.node;this.currentPortalNode=n;var r=this.placeholderNode.current,i=r.parentNode;n.mount(i,r),this.passPropsThroughPortal()},t.prototype.componentDidUpdate=function(){var n=this.props.node;this.currentPortalNode&&n!==this.currentPortalNode&&(this.currentPortalNode.unmount(this.placeholderNode.current),this.currentPortalNode=n);var r=this.placeholderNode.current,i=r.parentNode;n.mount(i,r),this.passPropsThroughPortal()},t.prototype.componentWillUnmount=function(){var n=this.props.node;n.unmount(this.placeholderNode.current)},t.prototype.render=function(){return d.createElement("div",{ref:this.placeholderNode})},t}(d.PureComponent),_t=Ve.bind(null,se);Ve.bind(null,ae);const Be=$.createContext(void 0);function Fe({pane:e,children:t}){const n=d.useRef(),r=d.useRef(),i=d.useMemo(()=>({pane:e,title:n,icon:r}),[e]);return a.jsx(Be.Provider,{value:i,children:t})}function qe(){const e=d.useContext(Be);if(!e)throw new Error("Not in a pane context");return e}Fe.__docgenInfo={description:"",methods:[],displayName:"PaneHookContextProvider",props:{pane:{required:!0,tsType:{name:"PaneModel"},description:""}}};function ce(e){const{title:t,pane:n}=qe();e&&(t.current=e),d.useEffect(()=>{t.current&&t.current!==n.getTabTitle()&&n.setTabTitle(t.current)})}function Ae(e){const{icon:t,pane:n}=qe();e&&(t.current=e),d.useEffect(()=>{t.current&&!ie(t.current,n.getTabIcon())&&n.setTabIcon(t.current)})}function T(e,t){const[n,r]=d.useState(t()),i=d.useRef(t);return i.current=t,d.useEffect(()=>e.observe(()=>r(i.current())),[e]),n}function de(e){return T(e,()=>[...e.getChildren()])}function He(e){const t=T(e,()=>[...e.getSizes()]),n=d.useCallback(r=>{e.setSizes(r)},[e]);return[t,n]}function Ge({paneDefinitions:e,pane:t}){const n=T(t,t.getLocation),r=T(t,t.getParameters),i=d.useMemo(()=>{try{const c=new URL(n);return c.protocol!=="campaign-buddy:"?n:c.pathname.split("/")[0]}catch{return n}},[n]),o=e[i??""];if(ce(o==null?void 0:o.defaultTitle),Ae(o==null?void 0:o.defaultIcon),!o)return null;const{Component:s}=o;return a.jsx(s,{location:n,parameters:r})}Ge.__docgenInfo={description:"",methods:[],displayName:"PaneWrapper",props:{paneDefinitions:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"PaneDefinition"}],raw:"Record<string, PaneDefinition>"},description:""},pane:{required:!0,tsType:{name:"PaneModel"},description:""}}};const Ue=$.createContext({paneNodes:{}});function Lt(e){const{paneNodes:t}=d.useContext(Ue),n=t[e];return n||null}function Je({panes:e,paneDefinitions:t,children:n}){const r=d.useRef({});d.useEffect(()=>{const o=new Set(e.map(s=>s.getId()));for(const s of Object.keys(r.current))o.has(s)||delete r.current[s]},[e]);const i=d.useMemo(()=>({paneNodes:Object.fromEntries(e.map(o=>{const s=o.getId();r.current[s]||(r.current[s]=_t());const c=r.current[s];return[o.getId(),c]}))}),[e]);return a.jsx(Ue.Provider,{value:i,children:a.jsxs(a.Fragment,{children:[e.map(o=>a.jsx(Nt,{node:i.paneNodes[o.getId()],children:a.jsx(Fe,{pane:o,children:a.jsx(Ge,{pane:o,paneDefinitions:t})})},o.getId())),n]})})}Je.__docgenInfo={description:"",methods:[],displayName:"PaneContentProvider",props:{panes:{required:!0,tsType:{name:"Array",elements:[{name:"PaneModel"}],raw:"PaneModel[]"},description:""},paneDefinitions:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"PaneDefinition"}],raw:"Record<string, PaneDefinition>"},description:""}}};const Ye=({pane:e})=>{const t=Lt(e.getId());return t?a.jsx(Et,{node:t}):null};Ye.__docgenInfo={description:"",methods:[],displayName:"Pane",props:{pane:{required:!0,tsType:{name:"PaneModel"},description:""}}};const W=50,Vt=b.div`
	overflow: hidden;
	position: relative;
	flex-grow: 0;
	flex-shrink: 0;
`,Bt=b.div`
	position: relative;
	flex-basis: ${({theme:e})=>e.sizes.gaps.medium}px;
	flex-shrink: 0;
	flex-grow: 0;
	z-index: 1000;
	cursor: ${({direction:e})=>e==="horizontal"?"ew-resize":"ns-resize"};
`,ye=b.div`
	display: flex;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({direction:e})=>e==="vertical"?"flex-direction: column;":""}
`,We=({direction:e,onDrag:t,onDragEnd:n,renderDividerChild:r,rightIndex:i})=>{const o=d.useRef(!1),s=d.useRef({x:0,y:0}),c=d.useRef(n),l=d.useRef(t);d.useEffect(()=>{l.current=t},[t]),d.useEffect(()=>{c.current=n},[n]),d.useEffect(()=>{const h=m=>{var y;if(!o.current)return;o.current=!1;const v={xDiff:m.pageX-s.current.x,yDiff:m.pageY-s.current.y};(y=c.current)==null||y.call(c,v),s.current={x:0,y:0}},g=m=>{var y;if(!o.current)return;m.preventDefault();const v={xDiff:m.pageX-s.current.x,yDiff:m.pageY-s.current.y};(y=l.current)==null||y.call(l,v)};return document.addEventListener("mouseup",h),document.addEventListener("mousemove",g),()=>{document.removeEventListener("mouseup",h),document.removeEventListener("mousemove",g)}},[]);const u=d.useCallback(h=>{h.button===0&&(o.current=!0,s.current={x:h.pageX,y:h.pageY})},[]);return a.jsx(Bt,{direction:e,onMouseDown:u,children:r==null?void 0:r(i)})};We.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{direction:{required:!0,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:""},rightIndex:{required:!0,tsType:{name:"number"},description:""},renderDividerChild:{required:!1,tsType:{name:"signature",type:"function",raw:"(rightIndex: number) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"rightIndex"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},onDrag:{required:!1,tsType:{name:"signature",type:"function",raw:"(diff: PositionDiff) => void",signature:{arguments:[{type:{name:"PositionDiff"},name:"diff"}],return:{name:"void"}}},description:""},onDragEnd:{required:!1,tsType:{name:"signature",type:"function",raw:"(totalDiff: PositionDiff) => void",signature:{arguments:[{type:{name:"PositionDiff"},name:"totalDiff"}],return:{name:"void"}}},description:""}}};function Ft(e,t,n,r,i,o,s,c){const l=t==="horizontal"?"width":"height",u=(r==null?void 0:r.getBoundingClientRect()[l])??0,g=e[t==="horizontal"?"xDiff":"yDiff"]/u*100,m=i[n-1],v=i[n];if(!m||!v)return;let y=o[n-1]+g,x=o[n]-g;const f=o[n-1]/100*u,p=y/100*u,P=o[n]/100*u,C=x/100*u,I=n-1!==0,w=n!==i.length-1,k=C<W+c/(w?1:2)&&C<=P,j=p<W+c/(I?1:2)&&p<=f;if(k&&j)return;const J=o[n]+o[n-1],O=W/u*100,fe=J-O;k?(x=O,y=fe):j&&(y=O,x=fe),v.style.flexBasis=X(x,w,c),m.style.flexBasis=X(y,I,c),s[n-1]=y,s[n]=x}function X(e,t,n){return`calc(${e}% - ${n/(t?1:2)}px)`}function qt(e,t){for(let n=e.length-1;n>=0;n--)if(t(e[n]))return n;return-1}const le=({direction:e,children:t,sizes:n,onSizesChange:r,renderDividerChild:i})=>{const o=$.Children.count(t),s=d.useRef(null),c=d.useRef(new Map),l=d.useRef([]),u=d.useRef(n),h=d.useRef([...n]),g=d.useRef(r),v=je().sizes.gaps.medium;d.useEffect(()=>{g.current=r},[r]),d.useEffect(()=>{l.current=[...c.current.values()].sort((x,f)=>x.index-f.index).map(x=>x.element)},[t]),d.useEffect(()=>{if(!ie(u.current,n)){u.current=n,h.current=[...n];for(let x=0;x<l.current.length;x++){const f=l.current[x],p=n[x];f.style.flexBasis=X(p,x!==0&&x!==l.current.length-1,v)}}},[n,v]);const y=d.useMemo(()=>{const x=$.Children.count(t);return $.Children.map(t,(f,p)=>a.jsxs(a.Fragment,{children:[p!==0&&a.jsx(We,{direction:e,renderDividerChild:i,rightIndex:p,onDrag:P=>{Ft(P,e,p,s.current,l.current,u.current,h.current,v)},onDragEnd:()=>{var w;const P=h.current.reduce((k,j)=>k+j),C=e==="horizontal"?"width":"height",I=((w=s.current)==null?void 0:w.getBoundingClientRect()[C])??0;if(P!==100){const k=100-P,j=qt(h.current,J=>J*I>W);h.current[j]+=k}u.current=[...h.current],g.current(h.current)}}),a.jsx(Vt,{ref:P=>{P===null?c.current.delete(f):(c.current.set(f,{element:P,index:p}),P.style.flexBasis=X(u.current[p],p!==0&&p!==x-1,v))},children:f})]}))},[t,e,v,i]);return o===1?a.jsx(ye,{ref:s,direction:e,children:t}):a.jsx(ye,{ref:s,direction:e,children:y})};le.__docgenInfo={description:"",methods:[],displayName:"Split",props:{direction:{required:!0,tsType:{name:"union",raw:"'vertical' | 'horizontal'",elements:[{name:"literal",value:"'vertical'"},{name:"literal",value:"'horizontal'"}]},description:""},sizes:{required:!0,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:""},renderDividerChild:{required:!1,tsType:{name:"signature",type:"function",raw:"(leftIndex: number) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"leftIndex"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},onSizesChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(sizes: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"sizes"}],return:{name:"void"}}},description:""}}};function At(e){return{kind:"paneDragItem",location:e.getLocation(),tabName:e.getTabTitle(),paneId:e.getId(),icon:e.getTabIcon()}}const M="paneDragItem";function V(e){return e.kind===M&&typeof e.location=="string"&&typeof e.tabName=="string"}const Z="primary";function Ht(e=Z,t,n){const r=e==="selected"?"primary":e;return`background-color: ${t.colors[r][n]};`}function xe(e=Z,t,n){const r=e!=="primary"?"none":"raised",i=t.shadows[r][n];return i?`box-shadow: ${i.toCss()};`:""}function N(e=Z,t,n){if(n==="focused")return xe(e,t,n);const r=[Ht(e,t,n),xe(e,t,n)];return n==="disabled"&&r.push(`color: ${t.colors.secondaryText[Xe(e)]};`,"cursor: not-allowed;"),r.join(" ")}function Xe(e=Z){return e==="primary"||e==="selected"?"onPrimary":e==="danger"?"onDanger":"onBackground"}const Qe=b.button`
	display: inline-flex;
	cursor: pointer;
	border-radius: ${({theme:e})=>e.borderRadii.default.toCss()};
	align-items: center;
	border: none;
	min-width: ${({theme:e,size:t="medium"})=>e.sizes.uiHeights[t]}px;
	outline: none;

	padding: ${({theme:e,size:t="medium"})=>e.sizes.uiContentPadding[t].toCss()};
	height: ${({theme:e,size:t="medium"})=>e.sizes.uiHeights[t]}px;
	gap: ${({theme:e})=>e.sizes.gaps.small}px;
	font-size: ${({theme:e,size:t="medium"})=>e.sizes.uiFont[t]}px;

	color: ${({theme:e,variant:t="primary"})=>e.colors.primaryText[Xe(t)]};
	transition: background-color 0.1s;

	${({theme:e,variant:t})=>N(t,e,"default")}

	&:hover {
		${({theme:e,variant:t})=>N(t,e,"hover")}
	}

	&:active {
		${({theme:e,variant:t})=>N(t,e,"active")}
	}

	&:focus {
		${({theme:e,variant:t})=>N(t,e,"focused")}
	}

	${({theme:e,variant:t,disabled:n})=>n&&N(t,e,"disabled")}

	&:disabled {
		${({theme:e,variant:t})=>N(t,e,"disabled")}
	}
`,Ke=b.span`
	margin-left: auto;
	display: inline-flex;
	align-items: center;
`,Gt={character:"gi/GiMeeple",chevronDown:"io5/IoChevronDown",chevronLeft:"io5/IoChevronBack",chevronRight:"io5/IoChevronForward",chevronUp:"io5/IoChevronUp",cross:"io5/IoClose",d20:"gi/GiDiceTwentyFacesTwenty",note:"io5/IoDocumentText",profile:"io5/IoPeopleCircleOutline"},Ut=b.span`
	display: inline-block;
	width: ${({size:e})=>e}px;
	height: ${({size:e})=>e}px;

	svg {
		fill: currentColor;
	}
`;function Q({name:e,size:t="medium"}){const n=je(),r=Jt(Gt[e]);return a.jsx(Ut,{size:n.sizes.iconSizes[t],children:r&&a.jsx(r,{size:n.sizes.iconSizes[t]})})}const Pe=Object.assign({"./react-icons/gi.d.ts":()=>Y(()=>import("./gi-BFAegp5r.js").then(e=>e.g),__vite__mapDeps([0,1,2]),import.meta.url),"./react-icons/gi.js":()=>Y(()=>import("./gi-BFAegp5r.js").then(e=>e.a),__vite__mapDeps([0,1,2]),import.meta.url),"./react-icons/io5.d.ts":()=>Y(()=>import("./io5-Bzo-0pZI.js").then(e=>e.i),__vite__mapDeps([3,1,2]),import.meta.url),"./react-icons/io5.js":()=>Y(()=>import("./io5-Bzo-0pZI.js").then(e=>e.a),__vite__mapDeps([3,1,2]),import.meta.url)});function Jt(e){const[t,n]=d.useState(null);return d.useEffect(()=>{var r;if(!e)return;let i=!1;const[o,s]=e.split("/"),c=(r=Pe[`./react-icons/${o}.ts`])!==null&&r!==void 0?r:Pe[`./react-icons/${o}.js`];if(c)return c().then(l=>{i||n(()=>l[s])}),()=>{i=!0}},[e]),t}var Yt=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n};const U=$.forwardRef((e,t)=>{var{onClick:n,leftIcon:r,rightIcon:i,disabled:o,size:s="medium",variant:c,children:l,onFocus:u,role:h,id:g}=e,m=Yt(e,["onClick","leftIcon","rightIcon","disabled","size","variant","children","onFocus","role","id"]);return a.jsxs(Qe,Object.assign({onClick:n,disabled:o,size:s,variant:c,role:h,onFocus:u,ref:t,id:g},m,{children:[r&&a.jsx(Q,{name:r,size:s}),l&&a.jsx("span",{children:l}),i&&a.jsx(Ke,{children:a.jsx(Q,{name:i,size:s})})]}))});U.displayName="Button";U.__docgenInfo={description:"",methods:[],displayName:"Button"};b.div`
	display: inline-block;
`;b.div`
	box-shadow: ${S.shadows.dropdown};
	padding: ${xt({_:S.sizes.uiContentPadding.medium,flush:0})};
	background-color: ${S.colors.background.dropdown};
	border-radius: ${S.borderRadii.default};
`;const Wt=Symbol("DropdownReference component");L(function({children:t}){return a.jsx(a.Fragment,{children:t})},Wt);const Xt=Symbol("DropdownContent component");L(function({children:t}){return a.jsx(a.Fragment,{children:t})},Xt);const Qt=b.div`
	width: ${S.sizes.iconSizes.medium};
`,Kt=b.div`
	border-bottom: ${S.colors.border} 2px solid;
	margin: ${S.sizes.uiContentPadding.small};
`,Zt=b.div`
	min-width: 150px;
	display: flex;
	flex-direction: column;
	padding-top: ${({theme:e})=>e.sizes.uiContentPadding.small.top}px;
	padding-bottom: ${({theme:e})=>e.sizes.uiContentPadding.small.bottom}px;
`,en=b(Qe)`
	width: 100%;
	flex-grow: 1;
	border-radius: 0;

	// Add extra padding for the content of the dropdown, but put it inside the button
	padding-left: ${({theme:e,size:t="medium"})=>e.sizes.uiContentPadding[t].left+e.sizes.uiContentPadding.small.left}px;
	padding-right: ${({theme:e,size:t="medium"})=>e.sizes.uiContentPadding[t].right+e.sizes.uiContentPadding.small.right}px;
`,Ze=$.createContext({reserveIconSpace:!1});function tn({onClick:e,icon:t,children:n,secondaryAction:r,isSelected:i}){const{reserveIconSpace:o}=d.useContext(Ze),s=d.useCallback(l=>{l.defaultPrevented||e==null||e()},[e]),c=Pt({isSelected:i});return a.jsxs(en,{variant:i?"selected":"minimal",onClick:s,ref:c,role:"menuitem",children:[t?a.jsx(Q,{name:t}):o?a.jsx(Qt,{}):null,n&&a.jsx("span",{children:n}),r&&a.jsx(Ke,{children:r})]})}const nn=d.createContext({close:()=>{},open:()=>{},isOpen:!1,sharedId:""});function et(){return d.useContext(nn)}const rn=Symbol("DropdownMenu reference"),on=Symbol("DropdownMenu content"),ue=Symbol("DropdownMenu item");L(function(t){const{isOpen:n,open:r,sharedId:i}=et(),o=Ct({up:()=>{r()},down:()=>{r()}});return a.jsx(U,Object.assign({"aria-haspopup":"menu","aria-controls":n?i:void 0,"aria-expanded":n,ref:o,id:`${i}-button`,rightIcon:n?"chevronUp":"chevronDown"},t))},rn);L(function({children:t}){const n=It(t,ue),{close:r,sharedId:i}=et(),o=d.useMemo(()=>({reserveIconSpace:n.some(c=>{var l;return!!(!((l=c.props)===null||l===void 0)&&l.icon)})}),[n]);return a.jsx(Ze.Provider,{value:o,children:a.jsx(wt,{"aria-orientation":"vertical",accessibleId:i,role:"menu",initiallyFocused:!0,onBlur:r,children:a.jsx(Zt,{children:n})})})},on);L(tn,ue);L(function(){return a.jsx(Kt,{role:"separator","aria-orientation":"vertical"})},ue);const Ce=b.div`
	margin-right: ${({theme:e})=>e.sizes.gaps.medium}px;
	display: flex;
`,sn=b.img`
	width: ${({theme:e})=>e.sizes.iconSizes.medium}px;
	height: ${({theme:e})=>e.sizes.iconSizes.medium}px;
	object-fit: contain;
`;function ee({tabIcon:e}){return(e==null?void 0:e.kind)==="icon"?a.jsx(Ce,{children:a.jsx(Q,{name:e.icon,size:"medium"})}):(e==null?void 0:e.kind)==="image"?a.jsx(Ce,{children:a.jsx(sn,{src:e.src,alt:""})}):null}ee.__docgenInfo={description:"",methods:[],displayName:"TabIcon",props:{tabIcon:{required:!1,tsType:{name:"union",raw:"TabIconNamed | TabIconImage",elements:[{name:"TabIconNamed"},{name:"TabIconImage"}]},description:""}}};const tt=({dragItem:e})=>a.jsxs(an,{children:[a.jsx(ee,{tabIcon:e.icon}),a.jsx("span",{children:e.tabName})]}),an=b.div`
	display: flex;
	color: ${({theme:e})=>e.colors.primaryText.onBackground};
	width: fit-content;
	background-color: ${({theme:e})=>e.colors.background.panel};
	border-radius: ${({theme:e})=>e.borderRadii.default.toCss()};
	opacity: 0.75;
	padding: ${({theme:e})=>e.sizes.uiInputPadding.medium.toCss()};
`;tt.__docgenInfo={description:"",methods:[],displayName:"PaneDragPreview",props:{dragItem:{required:!0,tsType:{name:"PaneDragItem"},description:""}}};function B(e,t,n){const r=me(t),i=me(n),o=d.useRef(),[s,c]=d.useState(),l=d.useCallback(f=>{ie(f,o.current)||(o.current=f,c(f))},[]),u=d.useRef(null),h=d.useCallback(f=>{var O;const p=(O=u.current)==null?void 0:O.getBoundingClientRect(),P=f.x-Math.floor((p==null?void 0:p.left)??0),C=f.y-Math.floor((p==null?void 0:p.top)??0),I=Math.floor((p==null?void 0:p.width)??0)/100,w=Math.floor((p==null?void 0:p.height)??0)/100,k=P/I,j=C/w;return r.current({x:k,y:j})},[r]),[{isOver:g,canDrop:m,isDragging:v},y]=pt(()=>({accept:e,collect:f=>{const p=f.isOver({shallow:!0}),P=f.getItemType()===e,C=!!f.getItem();return{isOver:p,canDrop:P,isDragging:C}},hover:(f,p)=>{const P=p.isOver({shallow:!0}),C=p.getItemType()===e,I=p.getClientOffset();P&&C&&I&&l(h(I))},drop:(f,p)=>{var I;const P=p.getItemType()===e;!s||!P||!p.isOver({shallow:!0})||((I=i.current)==null||I.call(i,s,f),l(void 0))},canDrop:()=>!!i.current}),[i,h,s,e]);d.useEffect(()=>{v||l(void 0)},[v,l]);const x=d.useCallback((f,p)=>{y(f,p),u.current=f},[y]);return{hoveringLocation:g&&m?s:void 0,dropRef:x,isDragging:v}}function cn(e){return e.x<50?"left":"right"}function dn(e){return e.y<50?"top":"bottom"}function ln(){return!0}function Ie(e,t,n){return e>=t&&e<=n}function un(e){if(Ie(e.x,20,80)&&Ie(e.y,20,80))return"center";const r=e.y<e.x,i=e.y<100-e.x;return r&&i?"top":r&&!i?"right":!r&&i?"left":"bottom"}const F={splitVertically:cn,splitHorizontally:dn,isOver:ln,xBox:un};function nt(e){const[{isDragging:t},n,r]=ft(()=>({type:M,item:At(e),collect:i=>({isDragging:i.isDragging()})}));return d.useEffect(()=>{r(mt(),{captureDraggingState:!0})},[]),{isDragging:t,dragRef:n}}const hn=b.div`
	border-radius: ${({theme:e})=>e.borderRadii.default.toCss()};
	border-top-left-radius: ${({isFirstTabActive:e,theme:t})=>e?"0":`${t.borderRadii.default.topLeft}px`};
	background-color: ${({theme:e})=>e.colors.background.panel};
	height: 100%;
`,pn=b.div`
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	width: 100%;
	height: 100%;
`,fn={top:"0",bottom:"50%",right:"0",left:"0",center:"0"},mn={top:"0",bottom:"0",right:"50%",left:"0",center:"0"},gn={top:"100%",bottom:"100%",right:"50%",left:"50%",center:"100%"},vn={top:"50%",bottom:"50%",right:"100%",left:"100%",center:"100%"},bn=b.div`
	position: absolute;
	opacity: 1;
	background-color: ${({theme:e})=>e.colors.background.dropzone};
	pointer-events: none;
	border-radius: ${({theme:e})=>e.borderRadii.default.toCss()};
	top: ${({hoveringLocation:e})=>fn[e]};
	left: ${({hoveringLocation:e})=>mn[e]};
	width: ${({hoveringLocation:e})=>gn[e]};
	height: ${({hoveringLocation:e})=>vn[e]};
`,yn=b.div`
	pointer-events: none;
	position: absolute;
	visibility: hidden;
`,we=b.div`
	${({allowOverflow:e})=>!e&&"overflow: hidden"};
	white-space: nowrap;
	display: flex;
	flex-grow: 1;
	width: 100%;
`,xn=b.div`
	display: flex;
	flex-grow: 1;
	width: 100%;
`,Pn=()=>{};function Cn({items:e,getItemId:t,ItemComponent:n,OverflowedItemsComponent:r,ContainerComponent:i=In}){const[o,s]=Se(),[c,l]=d.useState({}),u=d.useMemo(()=>{if(!s)return[];let f=s==null?void 0:s.width;return e.filter(p=>{var P;const C=c[t(p)];return f-=(P=C==null?void 0:C.width)!==null&&P!==void 0?P:0,!(!C||f<0)})},[s,t,c,e]),h=d.useMemo(()=>{const f=new Set(u.map(t));return e.filter(p=>{const P=t(p);return!f.has(P)})},[t,e,u]),g=d.useMemo(()=>new Set(h.map(t)),[t,h]),m=d.useCallback((f,p)=>{if(!p)return;const P=t(f);l(C=>{const I=C[P];return(I==null?void 0:I.height)===p.height&&(I==null?void 0:I.width)===p.width?C:Object.assign(Object.assign({},C),{[P]:p})})},[t]);d.useEffect(()=>{l(f=>{const p=Object.keys(f),P=new Set(e.map(t)),C=[];for(const w of p)P.has(w)&&C.push(w);if(C.length===p.length)return f;const I={};for(const w of C)I[w]=f[w];return I})},[t,e]);const v=a.jsx(we,{ref:o,children:u.map((f,p)=>a.jsx(Te,{item:f,index:p,ItemComponent:n,registerSize:m},t(f)))}),y=h.length?a.jsx(we,{allowOverflow:!0,children:e.map((f,p)=>a.jsx(Te,{item:f,index:p,ItemComponent:n,registerSize:g.has(t(f))?m:Pn},t(f)))}):null,x=a.jsx(r,{items:h});return a.jsxs(a.Fragment,{children:[a.jsx(i,{items:v,overflowedItems:x}),a.jsx(yn,{tabIndex:-1,children:y})]})}function Te({registerSize:e,item:t,ItemComponent:n,index:r}){const[i,o]=Se();return d.useEffect(()=>{e(t,o)},[t,o,e]),a.jsx(n,{index:r,item:t,itemRef:i})}function In({items:e,overflowedItems:t}){return a.jsxs(xn,{children:[e,t]})}const wn=K`
	background-color: ${({theme:e})=>e.colors.background.dropzone};

	:before {
		content: '';
		position: absolute;
		bottom: ${({theme:e})=>e.borderRadii.default.topLeft*-1}px;
		left: 0;
		width: ${({theme:e})=>e.borderRadii.default.topLeft}px;
		height: ${({theme:e})=>e.borderRadii.default.topLeft}px;
		z-index: -10;
		background-color: ${({theme:e})=>e.colors.background.dropzone};
	}

	:after {
		content: '';
		position: absolute;
		bottom: ${({theme:e})=>e.borderRadii.default.topRight*-1}px;
		right: 0;
		width: ${({theme:e})=>e.borderRadii.default.topRight}px;
		height: ${({theme:e})=>e.borderRadii.default.topRight}px;
		z-index: -10;
		background-color: ${({theme:e})=>e.colors.background.dropzone};
	}
`,Tn=b.div`
	display: flex;
	border-radius: ${({theme:e})=>e.borderRadii.default.topLeft}px
		${({theme:e})=>e.borderRadii.default.topRight}px 0 0;
	position: relative;
	// The tabs may flicker away for a second for measuring to occur
	min-height: ${({theme:e})=>e.sizes.uiHeights.medium}px;
	${({isOver:e})=>e&&wn}
`,zn=K`
	:after {
		content: '';
		pointer-events: none;
		position: absolute;
		${({hoveringSide:e})=>e==="left"?"left: 0px;":"right: 0px;"}
		height: 100%;
		z-index: 100;
		top: 0;
		border-left: solid 2px ${({theme:e})=>e.colors.primary.default};
	}
`,Rn=b.div`
	margin-left: ${({theme:e})=>e.sizes.gaps.medium}px;
`,Mn=b.div`
	position: relative;

	:not(.campaign-buddy-active-tab):not(:hover)
		+ &:not(:first-child):not(.campaign-buddy-active-tab):not(:hover):before {
		content: '';
		position: absolute;
		width: 1px;
		left: 0px;
		height: 60%;
		top: 20%;
		border-left: solid 1px
			${({theme:e})=>e.colors.primaryText.onBackground};
	}

	&:not(.campaign-buddy-active-tab):hover {
		background-color: ${({theme:e})=>e.colors.minimal.hover};

		&:first-child:before {
			position: absolute;
			content: '';
			bottom: ${({theme:e})=>e.borderRadii.default.topLeft*-1}px;
			left: 0;
			z-index: -10;
			width: ${({theme:e})=>e.borderRadii.default.topLeft}px;
			height: ${({theme:e})=>e.borderRadii.default.topLeft}px;
			background-color: ${({theme:e})=>e.colors.minimal.hover};
		}
	}

	border-radius: ${({theme:e})=>[e.borderRadii.default.topRight,e.borderRadii.default.topLeft,0,0].map(t=>`${t}px`).join(" ")};

	background-color: ${({theme:e,isActive:t})=>t?e.colors.background.panel:e.colors.minimal.default};

	${({isDragging:e})=>e?"opacity: 0.5;":""};
`,kn=b.div`
	min-height: ${({theme:e})=>e.sizes.uiHeights.medium}px;
	max-height: ${({theme:e})=>e.sizes.uiHeights.medium}px;
	height: ${({theme:e})=>e.sizes.uiHeights.medium}px;
	padding: 0 ${({theme:e})=>e.sizes.gaps.medium}px;
	white-space: nowrap;
	cursor: default;
	user-select: none;
	display: flex;
	color: ${({theme:e})=>e.colors.primaryText.onBackground};
	align-items: center;

	${({hoveringSide:e})=>e&&zn}
`,it=({item:{pane:e,isActive:t,onActivePaneIdChange:n},itemRef:r})=>{const i=T(e,e.getTabTitle),o=T(e,e.getTabIcon),s=e.getId(),c=d.useCallback(()=>{n(s)},[n,s]),{isDragging:l,dragRef:u}=nt(e),{dropRef:h,hoveringLocation:g}=B(M,F.splitVertically,(v,y)=>{var f;if(!V(y))return;const x=v==="left"?e:e.getSibling("after");(f=e.getParent())==null||f.addToTabBarFromDrop(y,x==null?void 0:x.getId())}),m=De(u,h);return a.jsx(Mn,{ref:r,isActive:t,isDragging:l,className:t?"campaign-buddy-active-tab":void 0,children:a.jsxs(kn,{onClick:c,ref:m,hoveringSide:g,children:[a.jsx(ee,{tabIcon:o}),a.jsx("span",{children:i}),a.jsx(Rn,{children:a.jsx(U,{leftIcon:"cross",onClick:v=>{v.preventDefault(),v.stopPropagation(),e.close()},variant:"minimal",size:"small"})})]})})};it.__docgenInfo={description:"",methods:[],displayName:"PaneTab",props:{item:{required:!0,tsType:{name:"TItem"},description:""},itemRef:{required:!0,tsType:{name:"ReactMutableRefObject",raw:"React.MutableRefObject<TRef | null>",elements:[{name:"union",raw:"TRef | null",elements:[{name:"TRef"},{name:"null"}]}]},description:""},index:{required:!0,tsType:{name:"number"},description:""}}};const jn=K`
	:after {
		content: '';
		pointer-events: none;
		position: absolute;
		${({hoveringSide:e})=>e==="top"?"top: 0px;":"bottom: 0px;"}
		width: 100%;
		z-index: 100;
		top: left;
		border-top: solid 2px ${({theme:e})=>e.colors.primary.default};
	}
`,Sn=b.div`
	position: relative;
	align-items: center;
	${({hoveringSide:e})=>e&&jn}
`,Dn=b.div`
	align-self: center;
	padding: 0 ${({theme:e})=>e.sizes.gaps.small}px;
`,$n=b.div`
	padding: 4px;
`;function rt({items:e}){const t=d.useMemo(()=>e.some(v=>v.isActive),[e]),[n,r,i]=ge(!1),[o,s,c]=ge(!1);d.useEffect(()=>{e.length===0&&i()},[i,e.length]);const{hoveringLocation:l,dropRef:u,isDragging:h}=B(M,F.isOver,void 0);ve(()=>{r()},!!l,700),ve(()=>{i()},!o&&h,700);const g=d.useMemo(()=>e.map(v=>({itemData:v})),[e]),m=d.useCallback(v=>a.jsx(On,{...v}),[]);return e.length===0?null:a.jsx(Dn,{ref:u,onDragOver:s,onDragLeave:c,children:a.jsx(Tt,{isOpen:n,onClose:i,items:g,renderMenuItem:m,children:a.jsx(bt,{value:t,onChange:r,icon:"chevron-down",size:"small"})})})}function On({item:e,MenuItem:t}){const n=e.itemData;if(!n)throw new Error("itemData is required");const{pane:r,isActive:i}=n,o=T(r,r.getTabIcon),{dragRef:s}=nt(r),{dropRef:c,hoveringLocation:l}=B(M,F.splitHorizontally,(m,v)=>{var x;if(!V(v))return;const y=m==="top"?r:r.getSibling("after");(x=r.getParent())==null||x.addToTabBarFromDrop(v,y==null?void 0:y.getId())}),u=De(s,c),h=T(n.pane,n.pane.getTabTitle),g=d.useMemo(()=>({displayText:h,renderRightElement:()=>a.jsx($n,{children:a.jsx(U,{leftIcon:"cross",size:"small",onClick:m=>{m.preventDefault(),m.stopPropagation(),n.pane.close()},variant:"minimal"})}),icon:a.jsx(ee,{tabIcon:o}),onClick:()=>n.onActivePaneIdChange(n.pane.getId())}),[n,h,o]);return a.jsx(Sn,{hoveringSide:l,ref:u,children:a.jsx(t,{isActive:i,verticalPadding:0,item:g,iconMargin:0})})}rt.__docgenInfo={description:"",methods:[],displayName:"TabOverflowMenu",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"TItem"}],raw:"TItem[]"},description:""}}};const ot=({panes:e,onActivePaneIdChange:t,activePaneId:n})=>{const{dropRef:r,hoveringLocation:i}=B(M,F.isOver,(c,l)=>{var h;if(!V(l))return;const u=(h=e[0])==null?void 0:h.getParent();u&&u.addToTabBarFromDrop(l)}),o=d.useMemo(()=>e.map(c=>({isActive:n===c.getId(),key:c.getId(),pane:c,onActivePaneIdChange:t})),[n,t,e]),s=d.useCallback(c=>c.pane.getId(),[]);return a.jsx(Tn,{ref:r,isOver:i,children:a.jsx(Cn,{items:o,getItemId:s,ItemComponent:it,OverflowedItemsComponent:rt})})};ot.__docgenInfo={description:"",methods:[],displayName:"TabBar",props:{panes:{required:!0,tsType:{name:"Array",elements:[{name:"PaneModel"}],raw:"PaneModel[]"},description:""},onActivePaneIdChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(activePaneId: string) => void",signature:{arguments:[{type:{name:"string"},name:"activePaneId"}],return:{name:"void"}}},description:""},activePaneId:{required:!1,tsType:{name:"string"},description:""}}};const st=({panel:e})=>{const t=de(e),n=T(e,()=>e.getActiveTabId()),r=d.useCallback(s=>e.setActiveTabId(s),[e]),{dropRef:i,hoveringLocation:o}=B(M,F.xBox,(s,c)=>{if(V(c)){if(s==="left"||s==="right"){e.addHorizontalFromDrop(c,s);return}if(s==="top"||s==="bottom"){e.addVerticalFromDrop(c,s);return}if(s==="center"){e.addToTabBarFromDrop(c);return}throw new Error(`unknown panel drop location ${s}`)}});return t[0]?a.jsxs(pn,{children:[a.jsx(ot,{panes:t,onActivePaneIdChange:r,activePaneId:n}),a.jsxs(hn,{isFirstTabActive:t&&n===t[0].getId(),ref:i,children:[t.map(s=>a.jsx("div",{style:{display:s.getId()===n?void 0:"none"},children:a.jsx(Ye,{pane:s})},s.getId())),o&&a.jsx(bn,{hoveringLocation:o})]})]}):null};st.__docgenInfo={description:"",methods:[],displayName:"Panel",props:{panel:{required:!0,tsType:{name:"PanelModel"},description:""}}};const Nn=K`
	&:before {
		content: '';
		position: absolute;
		pointer-events: none;
		height: ${({direction:e})=>e==="horizontal"?"64px":"100%"};
		width: ${({direction:e})=>e==="vertical"?"64px":"100%"};
		opacity: 1;
		background-color: ${({theme:e})=>e.colors.background.dropzone};
		z-index: 1000;

		top: ${({direction:e,theme:t})=>e==="horizontal"?(64-t.sizes.gaps.medium)/-2:0}px;
		left: ${({direction:e,theme:t})=>e==="vertical"?(64-t.sizes.gaps.medium)/-2:0}px;

		border-radius: ${({theme:e})=>e.borderRadii.default.toCss()};
	}
`,En=b.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	${({isDraggingOver:e})=>e&&Nn}
`;function he({rightChild:e,direction:t}){const{dropRef:n,hoveringLocation:r}=B(M,F.isOver,(i,o)=>{var s;V(o)&&((s=e.getParent())==null||s.addFromDrop(o,e.getId()))});return a.jsx(En,{direction:t,isDraggingOver:r,ref:n})}he.__docgenInfo={description:"",methods:[],displayName:"GutterDropZone",props:{rightChild:{required:!0,tsType:{name:"union",raw:"PanelRowModel | PanelLayoutModel | PanelModel",elements:[{name:"PanelRowModel"},{name:"PanelLayoutModel"},{name:"PanelModel"}]},description:""},direction:{required:!0,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:""}}};const at=({row:e})=>{const t=de(e),[n,r]=He(e),i=d.useCallback(o=>a.jsx(he,{direction:"vertical",rightChild:t[o]}),[t]);return a.jsx(le,{sizes:n,onSizesChange:r,direction:"horizontal",renderDividerChild:i,children:t.map(o=>o instanceof R?a.jsx(st,{panel:o},o.getId()):a.jsx(pe,{panelLayout:o},o.getId()))})};at.__docgenInfo={description:"",methods:[],displayName:"PanelRow",props:{row:{required:!0,tsType:{name:"PanelRowModel"},description:""}}};const pe=({panelLayout:e})=>{const t=de(e),[n,r]=He(e),i=d.useCallback(o=>a.jsx(he,{direction:"horizontal",rightChild:t[o]}),[t]);return a.jsx(le,{sizes:n,renderDividerChild:i,onSizesChange:r,direction:"vertical",children:t.map(o=>a.jsx(at,{row:o},o.getId()))})};pe.__docgenInfo={description:"",methods:[],displayName:"PanelLayout",props:{panelLayout:{required:!0,tsType:{name:"PanelLayoutModel"},description:""}}};function ct({panelLayout:e,paneDefintions:t}){const n=T(e.modelRegistry,()=>e.modelRegistry.getRegistry().filter(r=>r instanceof z));return a.jsx(Je,{panes:n,paneDefinitions:t,children:a.jsx(pe,{panelLayout:e})})}ct.__docgenInfo={description:"",methods:[],displayName:"PanelLayoutRoot",props:{panelLayout:{required:!0,tsType:{name:"PanelLayoutModel"},description:""},paneDefintions:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"PaneDefinition"}],raw:"Record<string, PaneDefinition>"},description:""}}};const dt=()=>{const{itemType:e,isDragging:t,item:n,currentOffset:r}=zt(o=>({item:o.getItem(),itemType:o.getItemType(),initialOffset:o.getInitialSourceClientOffset(),currentOffset:o.getSourceClientOffset(),isDragging:o.isDragging()}));if(!t||e!==M||!V(n)||!r)return null;const i=`translate(${r.x}px, ${r.y}px)`;return a.jsx(_n,{children:a.jsx("div",{style:{transform:i},children:a.jsx(tt,{dragItem:n})})})},_n=b.div`
	position: fixed;
	pointer-events: none;
	z-index: 100;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`;dt.__docgenInfo={description:"",methods:[],displayName:"CustomDragLayer"};function Ln({location:e}){return a.jsxs("p",{children:["I am character sheet at ",e]})}function Vn({location:e}){const[t,n]=d.useState(0);return a.jsxs("div",{children:[a.jsxs("p",{children:["I maintain my state: ",t]}),a.jsx("button",{onClick:()=>n(t+1),children:"Increment"}),a.jsxs("p",{children:["I am notes tool at ",e]})]})}const ze=[{kind:"icon",icon:"profile"},{kind:"image",src:"https://via.placeholder.com/75x100"}];function Bn(){const[e,t]=d.useState(!1),[n,r]=d.useState(0),[i,o]=d.useState("Normal title");Ae(ze[n]),ce(i);const s=d.useCallback(()=>{r(c=>c===ze.length-1?0:c+1)},[]);return a.jsxs("div",{children:[a.jsx("p",{children:"I can change my title"}),a.jsx("input",{value:i,onChange:c=>o(c.target.value)}),a.jsxs("div",{children:[a.jsx("button",{onClick:()=>t(!e),children:"Show sub component"}),a.jsx("button",{onClick:s,children:"Change icon"})]}),e&&a.jsx(Fn,{})]})}function Fn(){return ce("Subtitle"),a.jsx("p",{children:"I change the title"})}const qn={character:{defaultIcon:{kind:"icon",icon:"character"},defaultTitle:"Character tool",Component:Ln},note:{defaultIcon:{kind:"icon",icon:"note"},defaultTitle:"Notes tool",Component:Vn},tabHookTest:{defaultIcon:{kind:"icon",icon:"d20"},defaultTitle:"Default title",Component:Bn}},gi={title:"panel-layout/PanelLayout"},An=lt`
    html, body, #root {
        width: 100%;
        height: 100%;
        padding: 0 !important;
        margin: 0 !important;
    }
`,Hn=b.div`
    height: 100%;
    padding: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
`,Gn={kind:"panelLayout",children:[{kind:"panelRow",children:[{kind:"panel",children:[{kind:"pane",location:"campaign-buddy:character?characterId=1234&foo=bar"}]},{kind:"panel",children:[{kind:"pane",location:"campaign-buddy:note?noteId=12345"}]}],sizes:[50,50]},{kind:"panelRow",children:[{kind:"panel",children:[{kind:"pane",location:"campaign-buddy:tabHookTest"}]},{kind:"panelLayout",children:[{kind:"panelRow",children:[{kind:"panel",children:[{kind:"pane",location:"campaign-buddy:character?id=someotherid"}]}],sizes:[100]},{kind:"panelRow",children:[{kind:"panel",children:[{kind:"pane",location:"campaign-buddy:character/with/path?id=someid"}]}],sizes:[100]},{kind:"panelRow",children:[{kind:"panel",children:[{kind:"pane",location:"campaign-buddy:note/with/path?id=someid#hash"}]}],sizes:[100]}],sizes:[25,25,50]}],sizes:[50,50]}],sizes:[35,65]},G=_.create(Gn);function Un(){const e=G.getChildren()[0].getChildren()[0];e instanceof R&&e.addPane({location:"campaign-buddy:note",kind:"pane"})}function Jn(){G.getChildren()[0].addPanel({kind:"panel",children:[{kind:"pane",location:"campaign-buddy:character"}]})}function Yn(){console.log("serializing"),console.log(G,G.toJson())}const E=()=>a.jsx(Hn,{children:a.jsxs(gt,{backend:vt,children:[a.jsx(An,{}),a.jsxs("div",{children:[a.jsx("button",{onClick:Un,children:"Add pane"}),a.jsx("button",{onClick:Jn,children:"Add panel"}),a.jsx("button",{onClick:Yn,children:"Serialize"})]}),a.jsx(ct,{panelLayout:G,paneDefintions:qn}),a.jsx(dt,{})]})});E.parameters={backgrounds:{default:"campaign-buddy-app"}};E.__docgenInfo={description:"",methods:[],displayName:"Primary"};var Re,Me,ke;E.parameters={...E.parameters,docs:{...(Re=E.parameters)==null?void 0:Re.docs,source:{originalSource:`() => {
  return <StoryFnRoot>
            <DndProvider backend={HTML5Backend}>
                <GlobalStyle />
                <div>
                    <button onClick={addNewPane}>Add pane</button>
                    <button onClick={addNewPanel}>Add panel</button>
                    <button onClick={serialize}>Serialize</button>
                </div>
                <PanelLayout panelLayout={layout} paneDefintions={paneDefinitions} />
                <CustomDragLayer />
            </DndProvider>
        </StoryFnRoot>;
}`,...(ke=(Me=E.parameters)==null?void 0:Me.docs)==null?void 0:ke.source}}};export{E as Primary,gi as default};
