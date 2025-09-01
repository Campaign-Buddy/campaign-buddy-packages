const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./gi-BFAegp5r.js","./iconBase-DRO9aDiR.js","./index-tnPESBdE.js","./io5-Bzo-0pZI.js"])))=>i.map(i=>d[i]);
import{j as a}from"./jsx-runtime-PJfywvQB.js";import{H as v,C as oe,W as Dt}from"./styled-components.browser.esm-CuL3HyEV.js";import{u as Ot,a as $t,b as Nt,c as Et,g as _t,D as Lt,H as Vt}from"./index-q1RHaYn3.js";import{c as q}from"./index-go6VP56j.js";import{r as d,R as S}from"./index-tnPESBdE.js";import{r as Le}from"./index-BJt650PE.js";import{i as ue}from"./index-C4WGByT4.js";import{u as he}from"./index-D_0btrl3.js";import{b as z,t as I}from"./backgroundColor-DgtptAGf.js";import{_ as ee}from"./iframe-Bt_IFqIv.js";import{v as Ft,u as Ve,a as Bt,b as B,c as Ie,d as Ht,e as At,f as qt,s as Gt,o as Ut,g as Jt,t as N,h as Yt,i as Wt,j as Xt,C as Kt}from"./CompositeControl-06XT_jRg.js";import{u as H,a as Qt}from"./useCombinedRefs-Dfiq_Z7b.js";import{i as Zt}from"./index-ChYhBiAs.js";import{u as de}from"./useUpdatingRef-CQrjiaKT.js";import{u as ne}from"./useResizeObserver-Dyd7CEVH.js";import{u as en}from"./useBooleanState-BvRGCuoP.js";import"./index-aBkx2qY1.js";import"./navigateObject-ZMXbUPar.js";function Te(e,t,n){const r=d.useRef(e);r.current=e,d.useEffect(()=>{let i=null;return t&&(i=setTimeout(()=>r.current(),n)),()=>{i&&clearTimeout(i)}},[n,t])}function tn(e){const n=Ot().getMonitor(),[r,i]=$t(n,e);return d.useEffect(()=>n.subscribeToOffsetChange(i)),d.useEffect(()=>n.subscribeToStateChange(i)),r}function pe(e){return e&&Array.isArray(e.children)}function Fe(e){return e&&Array.isArray(e.sizes)}function Be(e){return e.kind==="panelLayout"&&pe(e)&&Fe(e)}function nn(e){return e.kind==="panelRow"&&pe(e)&&Fe(e)}function He(e){return e.kind==="panel"&&pe(e)}function rn(e){return e.kind==="pane"&&typeof e.location=="string"}function on(e,t,n){if(e.length<=1)return[];const r=[...e],i=e[t];if(typeof n=="number"&&n>=0&&n!==t)r[n]+=i,r.splice(t,1);else{r.splice(t,1);const o=i/r.length;for(let s=0;s<r.length;s++)r[s]+=o}return r}function sn(e,t,n){if(e.length===0)return[100];const r=[...e],i=[];typeof n=="number"&&n>=0&&n<e.length?i.push(n):(t>0&&i.push(t-1),t<e.length&&i.push(t));const s=i.reduce((c,l)=>c+e[l],0)/(i.length+1);for(const c of i)r[c]=s;return r.splice(t,0,s),r}class an{constructor(){this.isInTransaction=()=>!!this.currentTransaction,this.startTransaction=()=>{this.currentTransaction||(this.currentTransaction={eventIds:new Set,commitEvents:[],dataMutations:[],dataCleanups:[],dataMutationRollbacks:[]})},this.getId=()=>this.id,this.addCommitEvent=t=>{if(!this.currentTransaction){t();return}const n=q();return this.currentTransaction.eventIds.add(n),this.currentTransaction.commitEvents.push(t),n},this.addDataMutation=(t,n)=>{if(!this.currentTransaction){t();return}const r=q();return this.currentTransaction.eventIds.add(r),this.currentTransaction.dataMutations.push(t),this.currentTransaction.dataMutationRollbacks.push(n),r},this.addDataCleanup=t=>{if(!this.currentTransaction){t();return}const n=q();return this.currentTransaction.eventIds.add(n),this.currentTransaction.dataCleanups.push(t),n},this.addNormalizer=t=>{this.normalizers.push(t)},this.removeNormalizer=t=>{const n=this.normalizers.indexOf(t);n!==-1&&this.normalizers.splice(n,1)},this.hasPendingEvents=t=>{var n;return!!(t&&((n=this.currentTransaction)!=null&&n.eventIds.has(t)))},this.commit=()=>{if(!this.currentTransaction)return;for(const n of this.currentTransaction.dataMutations)n();for(;this.currentTransaction.dataCleanups.length>0;){this.currentTransaction.eventIds=new Set,this.currentTransaction.dataMutations=[];for(const n of this.currentTransaction.dataCleanups)n();this.currentTransaction.dataCleanups=[];for(const n of this.currentTransaction.dataMutations)n()}const{commitEvents:t}=this.currentTransaction;this.currentTransaction=void 0;for(const n of t)n()},this.rollback=()=>{if(this.currentTransaction){for(const t of this.currentTransaction.dataMutationRollbacks)t();this.currentTransaction=void 0}},this.normalizers=[],this.id=q()}}class _{constructor(t,n){this.addNormalization=r=>{this.normalizations.push(r)},this.getValue=(r="auto")=>r==="auto"&&this.transactionManager.isInTransaction()||r==="uncommitted"?this.uncommittedValue:this.committedValue,this.setValue=r=>{const i=!this.transactionManager.isInTransaction();i&&this.transactionManager.startTransaction(),this.uncommittedValue=r,this.transactionManager.hasPendingEvents(this.pendingMutationId)||(this.pendingMutationId=this.transactionManager.addDataMutation(()=>{this.committedValue=Re(this.uncommittedValue),this.pendingMutationId=void 0},()=>{this.uncommittedValue=Re(this.committedValue),this.pendingMutationId=void 0})),this.transactionManager.hasPendingEvents(this.pendingNormalizationId)||(this.pendingNormalizationId=this.transactionManager.addDataCleanup(()=>{this.pendingNormalizationId=void 0;for(const o of this.normalizations)o()})),this.transactionManager.hasPendingEvents(this.pendingCommitEventId)||(this.pendingCommitEventId=this.transactionManager.addCommitEvent(()=>{this.pendingCommitEventId=void 0;for(const o of this.observers)o(this.committedValue)})),i&&this.transactionManager.commit()},this.observe=r=>{this.observers.push(r)},this.unobserve=r=>{const i=this.observers.indexOf(r);i!==-1&&this.observers.splice(i,1)},this.uncommittedValue=t,this.committedValue=t,this.transactionManager=n,this.observers=[],this.normalizations=[]}}class le extends _{constructor(){super(...arguments),this.remove=t=>{this.splice(t,1)},this.insert=(t,n)=>{n===void 0?this.push(t):this.splice(n,0,t)},this.splice=(t,n,...r)=>{const i=[...this.getValue()];r.length===0?i.splice(t,n):i.splice(t,n,...r),this.setValue(i)},this.push=t=>{const n=[...this.getValue()];n.push(t),this.setValue(n)}}}class Ae{constructor(t){this.watchProperties=(...n)=>{for(const r of n)this.properties.push(r)},this.observe=n=>{for(const r of this.properties)r.observe(n);return()=>{for(const r of this.properties)r.unobserve(n)}},this.properties=[],this.transactionManager=t}}function Re(e){return Array.isArray(e)?[...e]:e===null?e:typeof e=="object"?{...e}:e}class cn extends Ae{constructor(t){super(t),this.getRegistry=()=>this.registry.getValue(),this.getById=n=>this.registryMap[n],this.remove=n=>{const r=this.registry.getValue().findIndex(i=>i.getId()===n);r!==-1&&this.registry.remove(r),delete this.registryMap[n]},this.add=n=>{this.registry.insert(n),this.registryMap[n.getId()]=n},this.registry=new le([],t),this.registryMap={},this.watchProperties(this.registry)}}const ce={};class qe extends Ae{constructor(t,n){super(t),this.transact=r=>{if(this.transactionManager.isInTransaction()){r();return}this.transactionManager.startTransaction();try{r()===!1?this.transactionManager.rollback():this.transactionManager.commit()}catch{this.transactionManager.rollback()}},this.getId=()=>this.id,this.getParent=()=>this.parent.getValue(),this.getSibling=(r="after")=>{const i=this.getParent();if(!i)return;const o=i.getChildren(),s=o.indexOf(this);return r==="before"?o[s-1]:o[s+1]},this.setParent=r=>{this.parent.setValue(r)},ce[t.getId()]||(ce[t.getId()]=new cn(t)),this.modelRegistry=ce[t.getId()],this.id=q(),this.parent=new _(n,this.transactionManager),this.hasEverHadParent=!!n,this.modelRegistry.add(this),this.parent.addNormalization(()=>{this.parent.getValue()&&(this.hasEverHadParent=!0),!this.parent.getValue()&&this.hasEverHadParent&&this.modelRegistry.remove(this.id)}),this.watchProperties(this.parent)}}class fe extends qe{constructor(t,n,r=!0){super(t,n),this.getChildren=()=>this.children.getValue(),this.getSizes=()=>this.sizes.getValue(),this.setSizes=o=>{this.trackSizes&&this.sizes.setValue(o)},this.replaceChildren=(o,s)=>{this.transact(()=>{const c=this.children.getValue(),l=this.sizes.getValue(),u=c.findIndex(C=>C.getId()===o);if(u===-1)return;c[u].setParent(void 0);const g=l[u]/s.length,b=Array.from(Array(s.length)).map(()=>g);this.sizes.splice(u,1,...b),this.children.splice(u,1,...s);for(const C of s)C.setParent(this)})},this.removeChild=(o,s)=>{this.transact(()=>{const c=this.children.getValue(),l=c.findIndex(m=>m.getId()===s),u=c.findIndex(m=>m.getId()===o);if(u===-1)return;this.children.getValue()[u].setParent(void 0),this.children.remove(u),this.trackSizes&&this.sizes.setValue(on(this.sizes.getValue(),u,l))})},this.addChild=(o,{takeSizeFromTargetId:s,beforeTargetId:c}={})=>{this.transact(()=>{const l=this.children.getValue(),u=l.findIndex(m=>m.getId()===s);let h=l.findIndex(m=>m.getId()===c);h===-1&&(h=this.children.getValue().length),this.children.insert(o,h),o.setParent(this),this.trackSizes&&this.sizes.setValue(sn(this.sizes.getValue(),h,u))})},this.init=(o,s)=>{this.children.setValue(o),this.sizes.setValue(s)},this.children=new le([],this.transactionManager),this.sizes=new le([],this.transactionManager),this.children.addNormalization(()=>{var o;this.children.getValue().length===0&&((o=this.parent.getValue())==null||o.removeChild(this.getId()));for(const s of this.getChildren()){const c=s.getParent();!c||c===this||s.setParent(this)}});const i=()=>{if(!this.trackSizes)return;const o=this.children.getValue(),s=this.sizes.getValue();if(o.length!==s.length){console.warn("Number of sizes does not match number of children. This is invalid, sizes will be overwritten to match children.",o,s);const c=100/o.length,l=o.map(()=>c);this.sizes.setValue(l)}};this.children.addNormalization(i),this.sizes.addNormalization(i),this.trackSizes=r,this.watchProperties(this.children,this.sizes)}}const J=class J extends fe{constructor(t,n,r){if(super(t,r),this.openPane=i=>{this.transact(()=>{this.getFirstPanel(this).addPane({kind:"pane",...i})})},this.addFromDrop=(i,o)=>{this.transact(()=>{const s=this.popOrCreatePane(i),c=new G(this.transactionManager),l=new D(this.transactionManager);c.addPanelFromModel(l),l.addPaneFromModel(s),this.addChild(c,{beforeTargetId:o})})},this.removeRow=(i,o)=>{this.removeChild(i,o)},this.addRow=(i,o)=>{this.addChild(new G(this.transactionManager,i),o)},this.addRowFromModel=(i,o)=>{this.addChild(i,o)},this.toJson=()=>({children:this.getChildren().map(i=>i.toJson()),sizes:[...this.getSizes()],kind:"panelLayout"}),this.popOrCreatePane=i=>{var s;const o=i.paneId&&this.modelRegistry.getById(i.paneId);return o instanceof M?((s=o.getParent())==null||s.removePane(o.getId()),o):new M(this.transactionManager,{location:i.location,kind:"pane"})},this.getFirstPanel=i=>{i.getChildren().length||this.addRow({kind:"panelRow",children:[],sizes:[]});const o=i.getChildren()[0];o.getChildren().length||o.addPanel({kind:"panel",children:[]});const s=o.getChildren()[0];return s instanceof J?this.getFirstPanel(s):s},n&&!Be(n))throw new Error("First constructor argument must be layout");this.init((n==null?void 0:n.children.map(i=>new G(this.transactionManager,i,this)))??[],(n==null?void 0:n.sizes)??[])}};J.create=t=>new J(new an,t);let A=J;class G extends fe{constructor(t,n,r){if(super(t,r),this.addFromDrop=(i,o)=>{this.transact(()=>{const s=this.popOrCreatePane(i),c=new D(this.transactionManager);c.addPaneFromModel(s),this.addChild(c,{beforeTargetId:o})})},this.removePanel=(i,o)=>{this.removeChild(i,o)},this.addPanel=(i,o)=>{this.addChild(new D(this.transactionManager,i,this),o)},this.addPanelFromModel=(i,o)=>{this.addChild(i,o)},this.addLayoutFromModel=(i,o)=>{this.addChild(i,o)},this.toJson=()=>({children:this.getChildren().map(i=>i.toJson()),sizes:[...this.getSizes()],kind:"panelRow"}),this.popOrCreatePane=i=>{var s;const o=i.paneId&&this.modelRegistry.getById(i.paneId);return o instanceof M?((s=o.getParent())==null||s.removePane(o.getId()),o):new M(this.transactionManager,{location:i.location,kind:"pane"})},n&&!nn(n))throw new Error("First constructor argument must be row");this.children.addNormalization(()=>{const i=this.getChildren(),o=this.getParent();if(i.length!==1||!o)return;const s=i[0];if(!(s instanceof A))return;const c=s.getChildren();c.length!==0&&o.replaceChildren(this.getId(),c)}),this.init((n==null?void 0:n.children.map(i=>{if(He(i))return new D(this.transactionManager,i,this);if(Be(i))return new A(this.transactionManager,i,this);throw new Error("Unexpected child of row")}))??[],(n==null?void 0:n.sizes)??[])}}class D extends fe{constructor(t,n,r){var i;if(super(t,r,!1),this.getActiveTabId=()=>this.activeTabId.getValue(),this.setActiveTabId=o=>this.activeTabId.setValue(o),this.addHorizontalFromDrop=(o,s)=>{this.transact(()=>{const c=this.getParent();if(!c)return;const l=this.popOrCreatePane(o),u=new D(this.transactionManager);u.addChild(l);const h=s==="left"?this:this.getSibling("after");c.addPanelFromModel(u,{beforeTargetId:h==null?void 0:h.getId(),takeSizeFromTargetId:this.getId()}),l.focus()})},this.addVerticalFromDrop=(o,s)=>{this.transact(()=>{const c=this.getParent();if(!c)return;const l=new A(this.transactionManager);c.replaceChildren(this.getId(),[l]);const u=new G(this.transactionManager),h=new G(this.transactionManager);l.addRowFromModel(u),l.addRowFromModel(h);const m=new D(this.transactionManager),g=this.popOrCreatePane(o);m.addChild(g),s==="top"?(u.addPanelFromModel(m),h.addPanelFromModel(this)):(u.addPanelFromModel(this),h.addPanelFromModel(m)),g.focus()})},this.addToTabBarFromDrop=(o,s)=>{this.transact(()=>{const c=this.popOrCreatePane(o);this.addChild(c,{beforeTargetId:s}),c.focus()})},this.removePane=o=>{this.removeChild(o)},this.addPaneFromModel=(o,s)=>{this.addChild(o,{beforeTargetId:s})},this.addPane=(o,s)=>{this.addChild(new M(this.transactionManager,o,this),{beforeTargetId:s})},this.toJson=()=>({children:this.getChildren().map(o=>o.toJson()),kind:"panel"}),this.popOrCreatePane=o=>{var c;const s=o.paneId&&this.modelRegistry.getById(o.paneId);return s instanceof M?((c=s.getParent())==null||c.removePane(s.getId()),s):new M(this.transactionManager,{location:o.location,kind:"pane"},this)},n&&!He(n))throw new Error("First constructor argument must be panel");this.init((n==null?void 0:n.children.map(o=>new M(this.transactionManager,o,this)))??[],[]),this.activeTabId=new _((i=this.getChildren()[0])==null?void 0:i.getId(),this.transactionManager),this.children.addNormalization(()=>{const o=this.getChildren(),s=this.activeTabId.getValue();if(o.length===0)return;o.find(l=>l.getId()===s)||this.setActiveTabId(o[0].getId())}),this.watchProperties(this.activeTabId)}}class M extends qe{constructor(t,n,r){if(super(t,r),this.close=()=>{this.transact(()=>{const i=this.getParent();i&&i.removeChild(this.getId())})},this.focus=()=>{const i=this.getParent();i&&i.setActiveTabId(this.getId())},this.setTabIcon=i=>{this.tabIcon.setValue(i)},this.getTabIcon=()=>this.tabIcon.getValue(),this.setLocation=i=>{this.location.setValue(i)},this.setTabTitle=i=>{this.tabTitle.setValue(i)},this.setParameters=i=>{this.parameters.setValue(i)},this.getTabTitle=()=>this.tabTitle.getValue(),this.getLocation=()=>this.location.getValue(),this.getParameters=()=>this.location.getValue(),this.toJson=()=>({location:this.location.getValue(),parameters:this.location.getValue(),kind:"pane"}),n&&!rn(n))throw new Error("First constructor argument must be pane");this.location=new _(n.location,this.transactionManager),this.tabTitle=new _("Campaign Buddy",this.transactionManager),this.tabIcon=new _({kind:"icon",icon:"d20"},this.transactionManager),this.parameters=new _(n.parameters,this.transactionManager),this.watchProperties(this.location,this.tabTitle,this.tabIcon,this.parameters)}}var Ge=function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,i){r.__proto__=i}||function(r,i){for(var o in i)i.hasOwnProperty(o)&&(r[o]=i[o])},e(t,n)};return function(t,n){e(t,n);function r(){this.constructor=t}t.prototype=n===null?Object.create(n):(r.prototype=n.prototype,new r)}}(),me="html",ge="svg",dn="http://www.w3.org/2000/svg",ln=function(e,t){if(t===me)return e instanceof HTMLElement;if(t===ge)return e instanceof SVGElement;throw new Error('Unrecognized element type "'+t+'" for validateElementType.')},Ue=function(e,t){var n={},r,i,o;if(e===me)o=document.createElement("div");else if(e===ge)o=document.createElementNS(dn,"g");else throw new Error('Invalid element type "'+e+'" for createPortalNode: must be "html" or "svg".');if(t&&typeof t=="object")for(var s=0,c=Object.entries(t.attributes);s<c.length;s++){var l=c[s],u=l[0],h=l[1];o.setAttribute(u,h)}var m={element:o,elementType:e,setPortalProps:function(g){n=g},getInitialPortalProps:function(){return n},mount:function(g,b){if(b!==i){if(m.unmount(),g!==r&&!ln(g,e))throw new Error('Invalid element type for portal: "'+e+'" portalNodes must be used with '+e+" elements, but OutPortal is within <"+g.tagName+">.");g.replaceChild(m.element,b),r=g,i=b}},unmount:function(g){g&&g!==i||r&&i&&(r.replaceChild(i,m.element),r=void 0,i=void 0)}};return m},un=function(e){Ge(t,e);function t(n){var r=e.call(this,n)||this;return r.addPropsChannel=function(){Object.assign(r.props.node,{setPortalProps:function(i){r.setState({nodeProps:i})}})},r.state={nodeProps:r.props.node.getInitialPortalProps()},r}return t.prototype.componentDidMount=function(){this.addPropsChannel()},t.prototype.componentDidUpdate=function(){this.addPropsChannel()},t.prototype.render=function(){var n=this,r=this.props,i=r.children,o=r.node;return Le.createPortal(d.Children.map(i,function(s){return d.isValidElement(s)?d.cloneElement(s,n.state.nodeProps):s}),o.element)},t}(d.PureComponent),hn=function(e){Ge(t,e);function t(n){var r=e.call(this,n)||this;return r.placeholderNode=d.createRef(),r.passPropsThroughPortal(),r}return t.prototype.passPropsThroughPortal=function(){var n=Object.assign({},this.props,{node:void 0});this.props.node.setPortalProps(n)},t.prototype.componentDidMount=function(){var n=this.props.node;this.currentPortalNode=n;var r=this.placeholderNode.current,i=r.parentNode;n.mount(i,r),this.passPropsThroughPortal()},t.prototype.componentDidUpdate=function(){var n=this.props.node;this.currentPortalNode&&n!==this.currentPortalNode&&(this.currentPortalNode.unmount(this.placeholderNode.current),this.currentPortalNode=n);var r=this.placeholderNode.current,i=r.parentNode;n.mount(i,r),this.passPropsThroughPortal()},t.prototype.componentWillUnmount=function(){var n=this.props.node;n.unmount(this.placeholderNode.current)},t.prototype.render=function(){return d.createElement("div",{ref:this.placeholderNode})},t}(d.PureComponent),pn=Ue.bind(null,me);Ue.bind(null,ge);const Je=S.createContext(void 0);function Ye({pane:e,children:t}){const n=d.useRef(),r=d.useRef(),i=d.useMemo(()=>({pane:e,title:n,icon:r}),[e]);return a.jsx(Je.Provider,{value:i,children:t})}function We(){const e=d.useContext(Je);if(!e)throw new Error("Not in a pane context");return e}Ye.__docgenInfo={description:"",methods:[],displayName:"PaneHookContextProvider",props:{pane:{required:!0,tsType:{name:"PaneModel"},description:""}}};function ve(e){const{title:t,pane:n}=We();e&&(t.current=e),d.useEffect(()=>{t.current&&t.current!==n.getTabTitle()&&n.setTabTitle(t.current)})}function Xe(e){const{icon:t,pane:n}=We();e&&(t.current=e),d.useEffect(()=>{t.current&&!ue(t.current,n.getTabIcon())&&n.setTabIcon(t.current)})}function R(e,t){const[n,r]=d.useState(t()),i=d.useRef(t);return i.current=t,d.useEffect(()=>(r(i.current()),e.observe(()=>r(i.current()))),[e]),n}function be(e){return R(e,()=>[...e.getChildren()])}function Ke(e){const t=R(e,()=>[...e.getSizes()]),n=d.useCallback(r=>{e.setSizes(r)},[e]);return[t,n]}function Qe({paneDefinitions:e,pane:t}){const n=R(t,t.getLocation),r=R(t,t.getParameters),i=d.useMemo(()=>{try{const c=new URL(n);return c.protocol!=="campaign-buddy:"?n:c.pathname.split("/")[0]}catch{return n}},[n]),o=e[i??""];if(ve(o==null?void 0:o.defaultTitle),Xe(o==null?void 0:o.defaultIcon),!o)return null;const{Component:s}=o;return a.jsx(s,{location:n,parameters:r})}Qe.__docgenInfo={description:"",methods:[],displayName:"PaneWrapper",props:{paneDefinitions:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"PaneDefinition"}],raw:"Record<string, PaneDefinition>"},description:""},pane:{required:!0,tsType:{name:"PaneModel"},description:""}}};const Ze=S.createContext({paneNodes:{}});function fn(e){const{paneNodes:t}=d.useContext(Ze),n=t[e];return n||null}function et({panes:e,paneDefinitions:t,children:n}){const r=d.useRef({});d.useEffect(()=>{const o=new Set(e.map(s=>s.getId()));for(const s of Object.keys(r.current))o.has(s)||delete r.current[s]},[e]);const i=d.useMemo(()=>({paneNodes:Object.fromEntries(e.map(o=>{const s=o.getId();r.current[s]||(r.current[s]=pn());const c=r.current[s];return[o.getId(),c]}))}),[e]);return a.jsx(Ze.Provider,{value:i,children:a.jsxs(a.Fragment,{children:[e.map(o=>a.jsx(un,{node:i.paneNodes[o.getId()],children:a.jsx(Ye,{pane:o,children:a.jsx(Qe,{pane:o,paneDefinitions:t})})},o.getId())),n]})})}et.__docgenInfo={description:"",methods:[],displayName:"PaneContentProvider",props:{panes:{required:!0,tsType:{name:"Array",elements:[{name:"PaneModel"}],raw:"PaneModel[]"},description:""},paneDefinitions:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"PaneDefinition"}],raw:"Record<string, PaneDefinition>"},description:""}}};const tt=({pane:e})=>{const t=fn(e.getId());return t?a.jsx(hn,{node:t}):null};tt.__docgenInfo={description:"",methods:[],displayName:"Pane",props:{pane:{required:!0,tsType:{name:"PaneModel"},description:""}}};const te=50,mn=v.div`
	overflow: hidden;
	position: relative;
	flex-grow: 0;
	flex-shrink: 0;
`,gn=v.div`
	position: relative;
	flex-basis: ${({theme:e})=>e.sizes.gaps.medium}px;
	flex-shrink: 0;
	flex-grow: 0;
	cursor: ${({direction:e})=>e==="horizontal"?"ew-resize":"ns-resize"};
`,ze=v.div`
	display: flex;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({direction:e})=>e==="vertical"?"flex-direction: column;":""}
`,nt=({direction:e,onDrag:t,onDragEnd:n,renderDividerChild:r,rightIndex:i})=>{const o=d.useRef(!1),s=d.useRef({x:0,y:0}),c=d.useRef(n),l=d.useRef(t);d.useEffect(()=>{l.current=t},[t]),d.useEffect(()=>{c.current=n},[n]),d.useEffect(()=>{const h=g=>{var C;if(!o.current)return;o.current=!1;const b={xDiff:g.pageX-s.current.x,yDiff:g.pageY-s.current.y};(C=c.current)==null||C.call(c,b),s.current={x:0,y:0}},m=g=>{var C;if(!o.current)return;g.preventDefault();const b={xDiff:g.pageX-s.current.x,yDiff:g.pageY-s.current.y};(C=l.current)==null||C.call(l,b)};return document.addEventListener("mouseup",h),document.addEventListener("mousemove",m),()=>{document.removeEventListener("mouseup",h),document.removeEventListener("mousemove",m)}},[]);const u=d.useCallback(h=>{h.button===0&&(o.current=!0,s.current={x:h.pageX,y:h.pageY})},[]);return a.jsx(gn,{direction:e,onMouseDown:u,children:r==null?void 0:r(i)})};nt.__docgenInfo={description:"",methods:[],displayName:"Divider",props:{direction:{required:!0,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:""},rightIndex:{required:!0,tsType:{name:"number"},description:""},renderDividerChild:{required:!1,tsType:{name:"signature",type:"function",raw:"(rightIndex: number) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"rightIndex"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},onDrag:{required:!1,tsType:{name:"signature",type:"function",raw:"(diff: PositionDiff) => void",signature:{arguments:[{type:{name:"PositionDiff"},name:"diff"}],return:{name:"void"}}},description:""},onDragEnd:{required:!1,tsType:{name:"signature",type:"function",raw:"(totalDiff: PositionDiff) => void",signature:{arguments:[{type:{name:"PositionDiff"},name:"totalDiff"}],return:{name:"void"}}},description:""}}};function vn(e,t,n,r,i,o,s,c){const l=t==="horizontal"?"width":"height",u=(r==null?void 0:r.getBoundingClientRect()[l])??0,m=e[t==="horizontal"?"xDiff":"yDiff"]/u*100,g=i[n-1],b=i[n];if(!g||!b)return;let C=o[n-1]+m,x=o[n]-m;const f=o[n-1]/100*u,p=C/100*u,y=o[n]/100*u,w=x/100*u,P=n-1!==0,T=n!==i.length-1,j=w<te+c/(T?1:2)&&w<=y,k=p<te+c/(P?1:2)&&p<=f;if(j&&k)return;const Z=o[n]+o[n-1],L=te/u*100,Pe=Z-L;j?(x=L,C=Pe):k&&(C=L,x=Pe),b.style.flexBasis=ie(x,T,c),g.style.flexBasis=ie(C,P,c),s[n-1]=C,s[n]=x}function ie(e,t,n){return`calc(${e}% - ${n/(t?1:2)}px)`}function bn(e,t){for(let n=e.length-1;n>=0;n--)if(t(e[n]))return n;return-1}const ye=({direction:e,children:t,sizes:n,onSizesChange:r,renderDividerChild:i})=>{const o=S.Children.count(t),s=d.useRef(null),c=d.useRef(new Map),l=d.useRef([]),u=d.useRef(n),h=d.useRef([...n]),m=d.useRef(r),b=he().sizes.gaps.medium;d.useEffect(()=>{m.current=r},[r]),d.useEffect(()=>{l.current=[...c.current.values()].sort((x,f)=>x.index-f.index).map(x=>x.element)},[t]),d.useEffect(()=>{if(!ue(u.current,n)){u.current=n,h.current=[...n];for(let x=0;x<l.current.length;x++){const f=l.current[x],p=n[x];f.style.flexBasis=ie(p,x!==0&&x!==l.current.length-1,b)}}},[n,b]);const C=d.useMemo(()=>{const x=S.Children.count(t);return S.Children.map(t,(f,p)=>a.jsxs(a.Fragment,{children:[p!==0&&a.jsx(nt,{direction:e,renderDividerChild:i,rightIndex:p,onDrag:y=>{vn(y,e,p,s.current,l.current,u.current,h.current,b)},onDragEnd:()=>{var T;const y=h.current.reduce((j,k)=>j+k),w=e==="horizontal"?"width":"height",P=((T=s.current)==null?void 0:T.getBoundingClientRect()[w])??0;if(y!==100){const j=100-y,k=bn(h.current,Z=>Z*P>te);h.current[k]+=j}u.current=[...h.current],m.current(h.current)}}),a.jsx(mn,{ref:y=>{y===null?c.current.delete(f):(c.current.set(f,{element:y,index:p}),y.style.flexBasis=ie(u.current[p],p!==0&&p!==x-1,b))},children:f})]}))},[t,e,b,i]);return o===1?a.jsx(ze,{ref:s,direction:e,children:t}):a.jsx(ze,{ref:s,direction:e,children:C})};ye.__docgenInfo={description:"",methods:[],displayName:"Split",props:{direction:{required:!0,tsType:{name:"union",raw:"'vertical' | 'horizontal'",elements:[{name:"literal",value:"'vertical'"},{name:"literal",value:"'horizontal'"}]},description:""},sizes:{required:!0,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:""},renderDividerChild:{required:!1,tsType:{name:"signature",type:"function",raw:"(leftIndex: number) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"leftIndex"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},onSizesChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(sizes: number[]) => void",signature:{arguments:[{type:{name:"Array",elements:[{name:"number"}],raw:"number[]"},name:"sizes"}],return:{name:"void"}}},description:""}}};const E="paneDragItem";function W(e){return e.kind===E&&typeof e.location=="string"&&typeof e.tabName=="string"}const se="primary";function yn(e=se,t,n){const r=e==="selected"?"primary":e;return z(t.colors[r][n])}function je(e=se,t,n){const r=e!=="primary"?"none":"raised",i=t.shadows[r][n];return i?`box-shadow: ${i.toCss()};`:""}function V(e=se,t,n){if(n==="focused")return je(e,t,n);const r=[yn(e,t,n),je(e,t,n)];return n==="disabled"&&r.push(`color: ${t.colors.secondaryText[it(e)]};`,"cursor: not-allowed;"),r.join(" ")}function it(e=se){return e==="primary"||e==="selected"?"onPrimary":e==="danger"?"onDanger":"onBackground"}const rt=v.button`
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

	color: ${({theme:e,variant:t="primary"})=>e.colors.primaryText[it(t)]};
	transition: background-color 0.1s;

	${({theme:e,variant:t})=>V(t,e,"default")}

	&:hover {
		${({theme:e,variant:t})=>V(t,e,"hover")}
	}

	&:active {
		${({theme:e,variant:t})=>V(t,e,"active")}
	}

	&:focus {
		${({theme:e,variant:t})=>V(t,e,"focused")}
	}

	${({theme:e,variant:t,disabled:n})=>n&&V(t,e,"disabled")}

	&:disabled {
		${({theme:e,variant:t})=>V(t,e,"disabled")}
	}
`,ot=v.span`
	margin-left: auto;
	display: inline-flex;
	align-items: center;
`,xn={character:"gi/GiMeeple",chevronDown:"io5/IoChevronDown",chevronLeft:"io5/IoChevronBack",chevronRight:"io5/IoChevronForward",chevronUp:"io5/IoChevronUp",cross:"io5/IoClose",d20:"gi/GiDiceTwentyFacesTwenty",note:"io5/IoDocumentText",profile:"io5/IoPeopleCircleOutline"},Cn=v.span`
	display: inline-block;
	width: ${({size:e})=>e}px;
	height: ${({size:e})=>e}px;

	svg {
		fill: currentColor;
	}
`;function re({name:e,size:t="medium"}){const n=he(),r=wn(xn[e]);return a.jsx(Cn,{size:n.sizes.iconSizes[t],children:r&&a.jsx(r,{size:n.sizes.iconSizes[t]})})}const ke=Object.assign({"./react-icons/gi.d.ts":()=>ee(()=>import("./gi-BFAegp5r.js").then(e=>e.g),__vite__mapDeps([0,1,2]),import.meta.url),"./react-icons/gi.js":()=>ee(()=>import("./gi-BFAegp5r.js").then(e=>e.a),__vite__mapDeps([0,1,2]),import.meta.url),"./react-icons/io5.d.ts":()=>ee(()=>import("./io5-Bzo-0pZI.js").then(e=>e.i),__vite__mapDeps([3,1,2]),import.meta.url),"./react-icons/io5.js":()=>ee(()=>import("./io5-Bzo-0pZI.js").then(e=>e.a),__vite__mapDeps([3,1,2]),import.meta.url)});function wn(e){const[t,n]=d.useState(null);return d.useEffect(()=>{var r;if(!e)return;let i=!1;const[o,s]=e.split("/"),c=(r=ke[`./react-icons/${o}.ts`])!==null&&r!==void 0?r:ke[`./react-icons/${o}.js`];if(c)return c().then(l=>{i||n(()=>l[s])}),()=>{i=!0}},[e]),t}var Pn=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n};const ae=S.forwardRef((e,t)=>{var{onClick:n,leftIcon:r,rightIcon:i,disabled:o,size:s="medium",variant:c,children:l,onFocus:u,role:h,id:m}=e,g=Pn(e,["onClick","leftIcon","rightIcon","disabled","size","variant","children","onFocus","role","id"]);return a.jsxs(rt,Object.assign({onClick:n,disabled:o,size:s,variant:c,role:h,onFocus:u,ref:t,id:m},g,{children:[r&&a.jsx(re,{name:r,size:s}),l&&a.jsx("span",{children:l}),i&&a.jsx(ot,{children:a.jsx(re,{name:i,size:s})})]}))});ae.displayName="Button";ae.__docgenInfo={description:"",methods:[],displayName:"Button"};const In=v.div`
	display: inline-block;
`,Tn=v.div`
	box-shadow: ${I.shadows.dropdown};
	padding: ${Ft({_:I.sizes.uiContentPadding.medium,flush:0})};
	${z(I.colors.background.dropdown)}
	border-radius: ${I.borderRadii.default};
`;function Rn(e,t=!0){const n=zn(e),r=Ve("body");Bt(r,"keydown",n,t)}function zn(e){const t=d.useRef(e);t.current=e;const n=d.useMemo(()=>Object.keys(e).map(r=>({handler:()=>{var i,o;return(o=(i=t.current)[r])===null||o===void 0?void 0:o.call(i)},eventIsHotkey:Zt(r)})),Object.keys(e));return d.useCallback(r=>{for(const{handler:i,eventIsHotkey:o}of n)o(r)&&i()},[n])}function O({isOpen:e,children:t,setIsOpen:n,portalElementSelector:r,variant:i,referenceGap:o}){const s=B(t,st),c=B(t,at),l=Ve(r??"body"),u=he();Rn({esc:()=>n(!1)},e);const h=Ie(),m=Ie();Ht(()=>{e&&n(!1)},h,m);const{refs:g,floatingStyles:b}=At({whileElementsMounted:Jt,middleware:[qt(),Gt(),Ut({mainAxis:o?u.sizes.gaps[o]:0})],placement:"bottom-start"}),C=H(g.setFloating,h),x=H(g.setReference,m);if(!s||!c)throw new Error("Exactly one button and one content child is required for Dropdown");return a.jsxs(a.Fragment,{children:[a.jsx(In,{ref:x,children:s}),e&&l&&Le.createPortal(a.jsx(Tn,{variant:i??"default",ref:C,style:b,children:c}),l)]})}const st=Symbol("DropdownReference component");O.Reference=N(function({children:t}){return a.jsx(a.Fragment,{children:t})},st);const at=Symbol("DropdownContent component");O.Content=N(function({children:t}){return a.jsx(a.Fragment,{children:t})},at);const jn=v.div`
	width: ${I.sizes.iconSizes.medium};
`,kn=v.div`
	border-bottom: ${I.colors.border} 2px solid;
	margin: ${I.sizes.uiContentPadding.small};
`,Mn=v.div`
	min-width: 150px;
	display: flex;
	flex-direction: column;
	padding-top: ${({theme:e})=>e.sizes.uiContentPadding.small.top}px;
	padding-bottom: ${({theme:e})=>e.sizes.uiContentPadding.small.bottom}px;
`,Sn=v(rt)`
	width: 100%;
	flex-grow: 1;
	border-radius: 0;

	// Add extra padding for the content of the dropdown, but put it inside the button
	padding-left: ${({theme:e,size:t="medium"})=>e.sizes.uiContentPadding[t].left+e.sizes.uiContentPadding.small.left}px;
	padding-right: ${({theme:e,size:t="medium"})=>e.sizes.uiContentPadding[t].right+e.sizes.uiContentPadding.small.right}px;
`,ct=S.createContext({reserveIconSpace:!1}),dt=S.forwardRef(({onClick:e,icon:t,children:n,secondaryAction:r,isSelected:i},o)=>{const{reserveIconSpace:s}=d.useContext(ct),c=d.useCallback(h=>{h.defaultPrevented||e==null||e()},[e]),l=Yt({isSelected:i}),u=H(l,o);return a.jsxs(Sn,{variant:i?"selected":"minimal",onClick:c,ref:u,role:"menuitem",children:[t?a.jsx(re,{name:t}):s?a.jsx(jn,{}):null,n&&a.jsx("span",{children:n}),r&&a.jsx(ot,{children:r})]})});dt.__docgenInfo={description:"",methods:[],displayName:"DropdownMenuItem"};var Dn=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n};const lt=d.createContext({close:()=>{},open:()=>{},isOpen:!1,sharedId:"",buttonRef:{current:null}});function ut(){return d.useContext(lt)}function On(e){var{children:t}=e,n=Dn(e,["children"]);return a.jsx(lt.Provider,{value:n,children:t})}const ht=Symbol("DropdownMenu reference"),pt=Symbol("DropdownMenu content"),xe=Symbol("DropdownMenu item");function $({isOpen:e,setIsOpen:t,children:n,portalElementSelector:r}){const i=B(n,ht),o=B(n,pt),s=d.useRef(null),c=d.useId(),l=d.useCallback(()=>{var g;(g=document.getElementById(`${c}-button`))===null||g===void 0||g.focus()},[c]),u=d.useCallback(()=>{t(!1),queueMicrotask(()=>l())},[l,t]),h=d.useCallback(()=>t(!0),[t]),m=d.useCallback(()=>u(),[u]);return a.jsx(On,{isOpen:e,open:h,close:u,sharedId:c,buttonRef:s,children:a.jsxs(O,{variant:"flush",isOpen:e,setIsOpen:t,portalElementSelector:r,children:[a.jsx(O.Reference,{children:i}),a.jsx(O.Content,{children:a.jsx("div",{onClick:m,children:o})})]})})}$.Button=N(function(t){const{isOpen:n,open:r,close:i,sharedId:o,buttonRef:s}=ut(),c=Wt({up:()=>{r()},down:()=>{r()}}),l=H(s,c);return a.jsx(ae,Object.assign({"aria-haspopup":"menu","aria-controls":n?o:void 0,"aria-expanded":n,ref:l,id:`${o}-button`,rightIcon:n?"chevronUp":"chevronDown",onClick:()=>n?i():r()},t))},ht);$.Content=N(S.forwardRef(({children:e},t)=>{const n=Xt(e,xe),{close:r,sharedId:i,buttonRef:o}=ut(),s=d.useMemo(()=>({reserveIconSpace:n.some(u=>{var h;return!!(!((h=u.props)===null||h===void 0)&&h.icon)})}),[n]),c=d.useCallback(l=>{var u;!((u=o.current)===null||u===void 0)&&u.contains(l.relatedTarget)||r()},[o,r]);return a.jsx(ct.Provider,{value:s,children:a.jsx(Kt,{"aria-orientation":"vertical",accessibleId:i,role:"menu",initiallyFocused:!0,onBlur:c,children:a.jsx(Mn,{ref:t,children:e})})})}),pt);$.Item=N(dt,xe);$.Divider=N(function(){return a.jsx(kn,{role:"separator","aria-orientation":"vertical"})},xe);const $n=oe`
	mask-image: linear-gradient(to left, transparent, black 30px);
	mask-repeat: no-repeat;
`,Nn=v.span`
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
	max-width: 100%;
	position: relative;
	${({showFader:e})=>e?$n:""}
`,En=v.span`
	display: inline-block;
	white-space: nowrap;
`,_n=v.div`
	display: inline-block;
`,Ln=v.div`
	color: ${I.colors.primaryText.onBackground};
`,ft=Symbol("TooltipReference"),mt=Symbol("TooltipContent");function U({children:e,disabled:t}){const[n,r]=d.useState(!1),i=B(e,mt),o=B(e,ft),s=Qt(r,500),c=d.useCallback(()=>s(!0),[s]),l=d.useCallback(()=>s(!1),[s]);return a.jsxs(O,{isOpen:n&&!t,setIsOpen:r,referenceGap:"small",children:[a.jsx(O.Reference,{children:a.jsx(_n,{onMouseEnter:c,onMouseLeave:l,onFocus:c,onBlur:c,children:o})}),a.jsx(O.Content,{children:a.jsx(Ln,{onMouseEnter:c,onMouseLeave:l,children:i})})]})}const gt=N(({children:e})=>a.jsx(a.Fragment,{children:e}),mt);gt.displayName="TooltipContent";const vt=N(({children:e})=>a.jsx(a.Fragment,{children:e}),ft);vt.displayName="TooltipReference";U.Content=gt;U.Reference=vt;function bt({children:e}){const[t,n]=ne(),[r,i]=ne(),o=d.useMemo(()=>!(n!=null&&n.width)||!(i!=null&&i.width)?!1:i.width>n.width,[n==null?void 0:n.width,i==null?void 0:i.width]);return a.jsx(Nn,{ref:t,showFader:o,children:a.jsx(En,{ref:r,children:a.jsxs(U,{disabled:!o,children:[a.jsx(U.Reference,{children:e}),a.jsx(U.Content,{children:e})]})})})}const Me=v.div`
	margin-right: ${({theme:e})=>e.sizes.gaps.medium}px;
	display: flex;
`,Vn=v.img`
	width: ${({theme:e})=>e.sizes.iconSizes.medium}px;
	height: ${({theme:e})=>e.sizes.iconSizes.medium}px;
	object-fit: contain;
`;function X({tabIcon:e}){return(e==null?void 0:e.kind)==="icon"?a.jsx(Me,{children:a.jsx(re,{name:e.icon,size:"medium"})}):(e==null?void 0:e.kind)==="image"?a.jsx(Me,{children:a.jsx(Vn,{src:e.src,alt:""})}):null}X.__docgenInfo={description:"",methods:[],displayName:"TabIcon",props:{tabIcon:{required:!1,tsType:{name:"union",raw:"TabIconNamed | TabIconImage",elements:[{name:"TabIconNamed"},{name:"TabIconImage"}]},description:""}}};const yt=({dragItem:e})=>a.jsxs(Fn,{children:[a.jsx(X,{tabIcon:e.icon}),a.jsx("span",{children:e.tabName})]}),Fn=v.div`
	display: flex;
	color: ${I.colors.primaryText.onBackground};
	width: fit-content;
	${z(I.colors.background.panel)}
	border-radius: ${I.borderRadii.default};
	opacity: 0.75;
	padding: ${I.sizes.uiInputPadding.medium};
`;yt.__docgenInfo={description:"",methods:[],displayName:"PaneDragPreview",props:{dragItem:{required:!0,tsType:{name:"PaneDragItem"},description:""}}};function K(e,t,n){const r=de(t),i=de(n),o=d.useRef(),[s,c]=d.useState(),l=d.useCallback(f=>{ue(f,o.current)||(o.current=f,c(f))},[]),u=d.useRef(null),h=d.useCallback(f=>{var L;const p=(L=u.current)==null?void 0:L.getBoundingClientRect(),y=f.x-Math.floor((p==null?void 0:p.left)??0),w=f.y-Math.floor((p==null?void 0:p.top)??0),P=Math.floor((p==null?void 0:p.width)??0)/100,T=Math.floor((p==null?void 0:p.height)??0)/100,j=y/P,k=w/T;return r.current({x:j,y:k})},[r]),[{isOver:m,canDrop:g,isDragging:b},C]=Nt(()=>({accept:e,collect:f=>{const p=f.isOver({shallow:!0}),y=f.getItemType()===e,w=!!f.getItem();return{isOver:p,canDrop:y,isDragging:w}},hover:(f,p)=>{const y=p.isOver({shallow:!0}),w=p.getItemType()===e,P=p.getClientOffset();y&&w&&P&&l(h(P))},drop:(f,p)=>{var P;const y=p.getItemType()===e;!s||!y||!p.isOver({shallow:!0})||((P=i.current)==null||P.call(i,s,f),l(void 0))},canDrop:()=>!!i.current}),[i,h,s,e]);d.useEffect(()=>{b||l(void 0)},[b,l]);const x=d.useCallback((f,p)=>{C(f,p),u.current=f},[C]);return{hoveringLocation:m&&g?s:void 0,dropRef:x,isDragging:b}}function Bn(e){return e.x<50?"left":"right"}function Hn(){return!0}function Se(e,t,n){return e>=t&&e<=n}function An(e){if(Se(e.x,20,80)&&Se(e.y,20,80))return"center";const r=e.y<e.x,i=e.y<100-e.x;return r&&i?"top":r&&!i?"right":!r&&i?"left":"bottom"}const Q={splitVertically:Bn,isOver:Hn,xBox:An};function xt(e){const t=qn(e),[{isDragging:n},r,i]=Et(()=>({type:E,item:()=>t.current,collect:o=>({isDragging:o.isDragging()})}));return d.useEffect(()=>{i(_t(),{captureDraggingState:!0})},[]),{isDragging:n,dragRef:r}}function qn(e){const t=R(e,()=>({kind:"paneDragItem",location:e.getLocation(),tabName:e.getTabTitle(),paneId:e.getId(),icon:e.getTabIcon()}));return de(t)}const Ct=()=>{const{itemType:e,isDragging:t,item:n,currentOffset:r}=tn(o=>({item:o.getItem(),itemType:o.getItemType(),initialOffset:o.getInitialSourceClientOffset(),currentOffset:o.getSourceClientOffset(),isDragging:o.isDragging()}));if(!t||e!==E||!W(n)||!r)return null;const i=`translate(${r.x}px, ${r.y}px)`;return a.jsx(Gn,{children:a.jsx("div",{style:{transform:i},children:a.jsx(yt,{dragItem:n})})})},Gn=v.div`
	position: fixed;
	pointer-events: none;
	z-index: 100;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
`;Ct.__docgenInfo={description:"",methods:[],displayName:"PanelLayoutDragLayer"};const Un=v.div`
	border-radius: ${I.borderRadii.default};
	border-top-left-radius: ${({isFirstTabActive:e,theme:t})=>e?"0":`${t.borderRadii.default.topLeft}px`};
	${z(I.colors.background.panel)}
	height: 100%;
`,Jn=v.div`
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	width: 100%;
	height: 100%;
`,Yn={top:"0",bottom:"50%",right:"0",left:"0",center:"0"},Wn={top:"0",bottom:"0",right:"50%",left:"0",center:"0"},Xn={top:"100%",bottom:"100%",right:"50%",left:"50%",center:"100%"},Kn={top:"50%",bottom:"50%",right:"100%",left:"100%",center:"100%"},Qn=v.div`
	position: absolute;
	opacity: 1;
	${z(I.colors.background.dropzone)}
	pointer-events: none;
	border-radius: ${I.borderRadii.default};
	top: ${({hoveringLocation:e})=>Yn[e]};
	left: ${({hoveringLocation:e})=>Wn[e]};
	width: ${({hoveringLocation:e})=>Xn[e]};
	height: ${({hoveringLocation:e})=>Kn[e]};
`,Zn=v.div`
	pointer-events: none;
	position: absolute;
	visibility: hidden;
`,De=v.div`
	${({allowOverflow:e})=>!e&&"overflow: hidden"};
	white-space: nowrap;
	display: flex;
	flex-grow: 1;
	width: 100%;
`,ei=v.div`
	display: flex;
	flex-grow: 1;
	width: 100%;
`,ti=()=>{};function ni({items:e,getItemId:t,ItemComponent:n,OverflowedItemsComponent:r,ContainerComponent:i=ii}){const[o,s]=ne(),[c,l]=d.useState({}),u=d.useMemo(()=>{if(!s)return[];let f=s==null?void 0:s.width;return e.filter(p=>{var y;const w=c[t(p)];return f-=(y=w==null?void 0:w.width)!==null&&y!==void 0?y:0,!(!w||f<0)})},[s,t,c,e]),h=d.useMemo(()=>{const f=new Set(u.map(t));return e.filter(p=>{const y=t(p);return!f.has(y)})},[t,e,u]),m=d.useMemo(()=>new Set(h.map(t)),[t,h]),g=d.useCallback((f,p)=>{if(!p)return;const y=t(f);l(w=>{const P=w[y];return(P==null?void 0:P.height)===p.height&&(P==null?void 0:P.width)===p.width?w:Object.assign(Object.assign({},w),{[y]:p})})},[t]);d.useEffect(()=>{l(f=>{const p=Object.keys(f),y=new Set(e.map(t)),w=[];for(const T of p)y.has(T)&&w.push(T);if(w.length===p.length)return f;const P={};for(const T of w)P[T]=f[T];return P})},[t,e]);const b=a.jsx(De,{ref:o,children:u.map((f,p)=>a.jsx(Oe,{item:f,index:p,ItemComponent:n,registerSize:g},t(f)))}),C=h.length?a.jsx(De,{allowOverflow:!0,children:e.map((f,p)=>a.jsx(Oe,{item:f,index:p,ItemComponent:n,registerSize:m.has(t(f))?g:ti},t(f)))}):null,x=a.jsx(r,{items:h});return a.jsxs(a.Fragment,{children:[a.jsx(i,{items:b,overflowedItems:x}),a.jsx(Zn,{tabIndex:-1,children:C})]})}function Oe({registerSize:e,item:t,ItemComponent:n,index:r}){const[i,o]=ne();return d.useEffect(()=>{e(t,o)},[t,o,e]),a.jsx(n,{index:r,item:t,itemRef:i})}function ii({items:e,overflowedItems:t}){return a.jsxs(ei,{children:[e,t]})}const ri=oe`
	${z(I.colors.background.dropzone)}

	:before {
		content: '';
		position: absolute;
		bottom: ${({theme:e})=>e.borderRadii.default.topLeft*-1}px;
		left: 0;
		width: ${({theme:e})=>e.borderRadii.default.topLeft}px;
		height: ${({theme:e})=>e.borderRadii.default.topLeft}px;
		z-index: -10;
		${z(I.colors.background.dropzone)}
	}

	:after {
		content: '';
		position: absolute;
		bottom: ${({theme:e})=>e.borderRadii.default.topRight*-1}px;
		right: 0;
		width: ${({theme:e})=>e.borderRadii.default.topRight}px;
		height: ${({theme:e})=>e.borderRadii.default.topRight}px;
		z-index: -10;
		${z(I.colors.background.dropzone)}
	}
`,oi=v.div`
	display: flex;
	border-radius: ${({theme:e})=>e.borderRadii.default.topLeft}px
		${({theme:e})=>e.borderRadii.default.topRight}px 0 0;
	position: relative;
	// The tabs may flicker away for a second for measuring to occur
	min-height: ${I.sizes.uiHeights.medium};
	${({isOver:e})=>e&&ri}
`,si=oe`
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
`,wt=v.div`
	margin-left: ${({theme:e})=>e.sizes.gaps.medium}px;
`,Pt=v.div`
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
		${z(I.colors.minimal.hover)}

		&:first-child:before {
			position: absolute;
			content: '';
			bottom: ${({theme:e})=>e.borderRadii.default.topLeft*-1}px;
			left: 0;
			z-index: -10;
			width: ${({theme:e})=>e.borderRadii.default.topLeft}px;
			height: ${({theme:e})=>e.borderRadii.default.topLeft}px;
			${z(I.colors.minimal.hover)}
		}
	}

	border-radius: ${({theme:e})=>[e.borderRadii.default.topRight,e.borderRadii.default.topLeft,0,0].map(t=>`${t}px`).join(" ")};

	${({isActive:e,theme:t})=>z(e?t.colors.background.panel:t.colors.minimal.default)};

	${({isDragging:e})=>e?"opacity: 0.5;":""};
`,ai=v(Pt)`
	width: 100px;
	max-width: 100px;
`,It=v.div`
	min-height: ${({theme:e})=>e.sizes.uiHeights.medium}px;
	max-height: ${({theme:e})=>e.sizes.uiHeights.medium}px;
	max-width: 200px;
	height: ${({theme:e})=>e.sizes.uiHeights.medium}px;
	padding: 0 ${({theme:e})=>e.sizes.gaps.medium}px;
	white-space: nowrap;
	cursor: default;
	user-select: none;
	display: flex;
	color: ${({theme:e})=>e.colors.primaryText.onBackground};
	align-items: center;

	${({hoveringSide:e})=>e&&si}
`,Tt=v.span`
	display: inline-block;
	max-width: 100%;
	overflow: hidden;
`,ci=v.div`
	display: flex;
	align-items: center;
`,Rt=({item:{pane:e,isActive:t,onActivePaneIdChange:n},itemRef:r})=>{const i=R(e,e.getTabTitle),o=R(e,e.getTabIcon),s=e.getId(),c=d.useCallback(()=>{n(s)},[n,s]),{isDragging:l,dragRef:u}=xt(e),{dropRef:h,hoveringLocation:m}=K(E,Q.splitVertically,(b,C)=>{var f;if(!W(C))return;const x=b==="left"?e:e.getSibling("after");(f=e.getParent())==null||f.addToTabBarFromDrop(C,x==null?void 0:x.getId())}),g=H(u,h);return a.jsx(Pt,{ref:r,isActive:t,isDragging:l,className:t?"campaign-buddy-active-tab":void 0,children:a.jsxs(It,{onClick:c,ref:g,hoveringSide:m,children:[a.jsx(X,{tabIcon:o}),a.jsx(Tt,{children:a.jsx(bt,{children:i})}),a.jsx(wt,{children:a.jsx(ae,{leftIcon:"cross",onClick:b=>{b.preventDefault(),b.stopPropagation(),e.close()},variant:"minimal",size:"small"})})]})})};function zt({items:e}){return e.length===0?null:a.jsx(di,{items:e})}function di({items:e}){const{isActive:t,pane:n,onActivePaneIdChange:r}=d.useMemo(()=>e.find(T=>T.isActive)??e[0],[e]),i=d.useRef(null),o=R(n,n.getTabTitle),s=R(n,n.getTabIcon),c=R(n,n.getId),{isDragging:l,dragRef:u}=xt(n),[h,m]=d.useState(!1),[g,b,C]=en(!1);d.useEffect(()=>{e.length===0&&m(!1)},[e.length]);const{hoveringLocation:x,dropRef:f,isDragging:p}=K(E,Q.isOver,void 0);Te(()=>{m(!0)},!!x,700),Te(()=>{m(!1)},!g&&p,700);const y=d.useCallback(T=>{var j,k;(j=i.current)!=null&&j.contains(T.target)||(k=P.current)!=null&&k.contains(T.target)||r(c)},[r,c]),w=H(u,f),P=d.useRef(null);return a.jsx(ai,{isActive:t,isDragging:l,onDragOver:b,onDragLeave:C,className:t?"campaign-buddy-active-tab":void 0,children:a.jsxs(It,{ref:w,onClick:y,children:[a.jsx(X,{tabIcon:s}),a.jsx(Tt,{children:a.jsx(bt,{children:o})}),a.jsx(wt,{ref:i,children:a.jsxs($,{isOpen:h,setIsOpen:m,children:[a.jsx($.Button,{variant:"minimal",size:"small"}),a.jsx($.Content,{ref:P,children:e.map(T=>a.jsx(li,{isActive:T.isActive,pane:T.pane,onActivePaneIdChange:T.onActivePaneIdChange},T.pane.getId()))})]})})]})})}function li({isActive:e,pane:t,onActivePaneIdChange:n}){const r=R(t,t.getTabTitle),i=R(t,t.getTabIcon),o=R(t,t.getId),s=d.useCallback(()=>{console.log("select",o),n(o)},[n,o]);return a.jsx($.Item,{isSelected:e,onClick:s,children:a.jsxs(ci,{children:[a.jsx(X,{tabIcon:i}),a.jsx("span",{children:r})]})})}Rt.__docgenInfo={description:"",methods:[],displayName:"PaneTab",props:{item:{required:!0,tsType:{name:"TItem"},description:""},itemRef:{required:!0,tsType:{name:"ReactMutableRefObject",raw:"React.MutableRefObject<TRef | null>",elements:[{name:"union",raw:"TRef | null",elements:[{name:"TRef"},{name:"null"}]}]},description:""},index:{required:!0,tsType:{name:"number"},description:""}}};zt.__docgenInfo={description:"",methods:[],displayName:"OverflowTab",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"TItem"}],raw:"TItem[]"},description:""}}};const jt=({panes:e,onActivePaneIdChange:t,activePaneId:n})=>{const{dropRef:r,hoveringLocation:i}=K(E,Q.isOver,(c,l)=>{var h;if(!W(l))return;const u=(h=e[0])==null?void 0:h.getParent();u&&u.addToTabBarFromDrop(l)}),o=d.useMemo(()=>e.map(c=>({isActive:n===c.getId(),key:c.getId(),pane:c,onActivePaneIdChange:t})),[n,t,e]),s=d.useCallback(c=>c.pane.getId(),[]);return a.jsx(oi,{ref:r,isOver:i,children:a.jsx(ni,{items:o,getItemId:s,ItemComponent:Rt,OverflowedItemsComponent:zt})})};jt.__docgenInfo={description:"",methods:[],displayName:"TabBar",props:{panes:{required:!0,tsType:{name:"Array",elements:[{name:"PaneModel"}],raw:"PaneModel[]"},description:""},onActivePaneIdChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(activePaneId: string) => void",signature:{arguments:[{type:{name:"string"},name:"activePaneId"}],return:{name:"void"}}},description:""},activePaneId:{required:!1,tsType:{name:"string"},description:""}}};const kt=({panel:e})=>{const t=be(e),n=R(e,()=>e.getActiveTabId()),r=d.useCallback(s=>e.setActiveTabId(s),[e]),{dropRef:i,hoveringLocation:o}=K(E,Q.xBox,(s,c)=>{if(W(c)){if(s==="left"||s==="right"){e.addHorizontalFromDrop(c,s);return}if(s==="top"||s==="bottom"){e.addVerticalFromDrop(c,s);return}if(s==="center"){e.addToTabBarFromDrop(c);return}throw new Error(`unknown panel drop location ${s}`)}});return t[0]?a.jsxs(Jn,{children:[a.jsx(jt,{panes:t,onActivePaneIdChange:r,activePaneId:n}),a.jsxs(Un,{isFirstTabActive:t&&n===t[0].getId(),ref:i,children:[t.map(s=>a.jsx("div",{style:{display:s.getId()===n?void 0:"none"},children:a.jsx(tt,{pane:s})},s.getId())),o&&a.jsx(Qn,{hoveringLocation:o})]})]}):null};kt.__docgenInfo={description:"",methods:[],displayName:"Panel",props:{panel:{required:!0,tsType:{name:"PanelModel"},description:""}}};const ui=oe`
	&:before {
		content: '';
		position: absolute;
		pointer-events: none;
		height: ${({direction:e})=>e==="horizontal"?"64px":"100%"};
		width: ${({direction:e})=>e==="vertical"?"64px":"100%"};
		opacity: 1;
		${z(I.colors.background.dropzone)}
		z-index: 1000;

		top: ${({direction:e,theme:t})=>e==="horizontal"?(64-t.sizes.gaps.medium)/-2:0}px;
		left: ${({direction:e,theme:t})=>e==="vertical"?(64-t.sizes.gaps.medium)/-2:0}px;

		border-radius: ${I.borderRadii.default};
	}
`,hi=v.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	${({isDraggingOver:e})=>e&&ui}
`;function Ce({rightChild:e,direction:t}){const{dropRef:n,hoveringLocation:r}=K(E,Q.isOver,(i,o)=>{var s;W(o)&&((s=e.getParent())==null||s.addFromDrop(o,e.getId()))});return a.jsx(hi,{direction:t,isDraggingOver:r,ref:n})}Ce.__docgenInfo={description:"",methods:[],displayName:"GutterDropZone",props:{rightChild:{required:!0,tsType:{name:"union",raw:"PanelRowModel | PanelLayoutModel | PanelModel",elements:[{name:"PanelRowModel"},{name:"PanelLayoutModel"},{name:"PanelModel"}]},description:""},direction:{required:!0,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:""}}};const Mt=({row:e})=>{const t=be(e),[n,r]=Ke(e),i=d.useCallback(o=>a.jsx(Ce,{direction:"vertical",rightChild:t[o]}),[t]);return a.jsx(ye,{sizes:n,onSizesChange:r,direction:"horizontal",renderDividerChild:i,children:t.map(o=>o instanceof D?a.jsx(kt,{panel:o},o.getId()):a.jsx(we,{panelLayout:o},o.getId()))})};Mt.__docgenInfo={description:"",methods:[],displayName:"PanelRow",props:{row:{required:!0,tsType:{name:"PanelRowModel"},description:""}}};const we=({panelLayout:e})=>{const t=be(e),[n,r]=Ke(e),i=d.useCallback(o=>a.jsx(Ce,{direction:"horizontal",rightChild:t[o]}),[t]);return a.jsx(ye,{sizes:n,renderDividerChild:i,onSizesChange:r,direction:"vertical",children:t.map(o=>a.jsx(Mt,{row:o},o.getId()))})};we.__docgenInfo={description:"",methods:[],displayName:"PanelLayout",props:{panelLayout:{required:!0,tsType:{name:"PanelLayoutModel"},description:""}}};function St({panelLayout:e,paneDefintions:t}){const n=R(e.modelRegistry,()=>e.modelRegistry.getRegistry().filter(r=>r instanceof M));return a.jsx(et,{panes:n,paneDefinitions:t,children:a.jsx(we,{panelLayout:e})})}St.__docgenInfo={description:"",methods:[],displayName:"PanelLayoutRoot",props:{panelLayout:{required:!0,tsType:{name:"PanelLayoutModel"},description:""},paneDefintions:{required:!0,tsType:{name:"Record",elements:[{name:"string"},{name:"PaneDefinition"}],raw:"Record<string, PaneDefinition>"},description:""}}};function pi({location:e}){return a.jsxs("p",{children:["I am character sheet at ",e]})}function fi({location:e}){const[t,n]=d.useState(0);return a.jsxs("div",{children:[a.jsxs("p",{children:["I maintain my state: ",t]}),a.jsx("button",{onClick:()=>n(t+1),children:"Increment"}),a.jsxs("p",{children:["I am notes tool at ",e]})]})}const $e=[{kind:"icon",icon:"profile"},{kind:"image",src:"https://via.placeholder.com/75x100"}];function mi(){const[e,t]=d.useState(!1),[n,r]=d.useState(0),[i,o]=d.useState("Normal title");Xe($e[n]),ve(i);const s=d.useCallback(()=>{r(c=>c===$e.length-1?0:c+1)},[]);return a.jsxs("div",{children:[a.jsx("p",{children:"I can change my title"}),a.jsx("input",{value:i,onChange:c=>o(c.target.value)}),a.jsxs("div",{children:[a.jsx("button",{onClick:()=>t(!e),children:"Show sub component"}),a.jsx("button",{onClick:s,children:"Change icon"})]}),e&&a.jsx(gi,{})]})}function gi(){return ve("Subtitle"),a.jsx("p",{children:"I change the title"})}const vi={character:{defaultIcon:{kind:"icon",icon:"character"},defaultTitle:"Character tool",Component:pi},note:{defaultIcon:{kind:"icon",icon:"note"},defaultTitle:"Notes tool",Component:fi},tabHookTest:{defaultIcon:{kind:"icon",icon:"d20"},defaultTitle:"Default title",Component:mi}},Hi={title:"panel-layout/PanelLayout"},bi=Dt`
    html, body, #root {
        width: 100%;
        height: 100%;
        padding: 0 !important;
        margin: 0 !important;
    }
`,yi=v.div`
    height: 100%;
    padding: 8px;
    position: relative;
    display: flex;
    flex-direction: column;
`,xi={kind:"panelLayout",children:[{kind:"panelRow",children:[{kind:"panel",children:[{kind:"pane",location:"campaign-buddy:character?characterId=1234&foo=bar"}]},{kind:"panel",children:[{kind:"pane",location:"campaign-buddy:note?noteId=12345"}]}],sizes:[50,50]},{kind:"panelRow",children:[{kind:"panel",children:[{kind:"pane",location:"campaign-buddy:tabHookTest"}]},{kind:"panelLayout",children:[{kind:"panelRow",children:[{kind:"panel",children:[{kind:"pane",location:"campaign-buddy:character?id=someotherid"}]}],sizes:[100]},{kind:"panelRow",children:[{kind:"panel",children:[{kind:"pane",location:"campaign-buddy:character/with/path?id=someid"}]}],sizes:[100]},{kind:"panelRow",children:[{kind:"panel",children:[{kind:"pane",location:"campaign-buddy:note/with/path?id=someid#hash"}]}],sizes:[100]}],sizes:[25,25,50]}],sizes:[50,50]}],sizes:[35,65]},Y=A.create(xi);function Ci(){const e=Y.getChildren()[0].getChildren()[0];e instanceof D&&e.addPane({location:"campaign-buddy:note",kind:"pane"})}function wi(){Y.getChildren()[0].addPanel({kind:"panel",children:[{kind:"pane",location:"campaign-buddy:character"}]})}function Pi(){console.log("serializing"),console.log(Y,Y.toJson())}const F=()=>a.jsx(yi,{children:a.jsxs(Lt,{backend:Vt,children:[a.jsx(bi,{}),a.jsxs("div",{children:[a.jsx("button",{onClick:Ci,children:"Add pane"}),a.jsx("button",{onClick:wi,children:"Add panel"}),a.jsx("button",{onClick:Pi,children:"Serialize"})]}),a.jsx(St,{panelLayout:Y,paneDefintions:vi}),a.jsx(Ct,{})]})});F.parameters={backgrounds:{default:"campaign-buddy-app"}};F.__docgenInfo={description:"",methods:[],displayName:"Primary"};var Ne,Ee,_e;F.parameters={...F.parameters,docs:{...(Ne=F.parameters)==null?void 0:Ne.docs,source:{originalSource:`() => {
  return <StoryFnRoot>
            <DndProvider backend={HTML5Backend}>
                <GlobalStyle />
                <div>
                    <button onClick={addNewPane}>Add pane</button>
                    <button onClick={addNewPanel}>Add panel</button>
                    <button onClick={serialize}>Serialize</button>
                </div>
                <PanelLayout panelLayout={layout} paneDefintions={paneDefinitions} />
                <PanelLayoutDragLayer />
            </DndProvider>
        </StoryFnRoot>;
}`,...(_e=(Ee=F.parameters)==null?void 0:Ee.docs)==null?void 0:_e.source}}};export{F as Primary,Hi as default};
