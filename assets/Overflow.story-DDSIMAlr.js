import{j as n}from"./jsx-runtime-PJfywvQB.js";import{r as l}from"./index-tnPESBdE.js";import"./index-C4WGByT4.js";import{u as M}from"./useResizeObserver-Dyd7CEVH.js";import{H as v}from"./styled-components.browser.esm-CuL3HyEV.js";import"./useUpdatingRef-CQrjiaKT.js";const q=v.div`
	pointer-events: none;
	position: absolute;
	visibility: hidden;
`,O=v.div`
	${({allowOverflow:e})=>!e&&"overflow: hidden"};
	white-space: nowrap;
	display: flex;
	flex-grow: 1;
	width: 100%;
`,K=v.div`
	display: flex;
	flex-grow: 1;
	width: 100%;
`,L=()=>{};function b({items:e,getItemId:t,ItemComponent:d,OverflowedItemsComponent:c,ContainerComponent:u=V}){const[m,f]=M(),[C,j]=l.useState({}),I=l.useMemo(()=>{if(!f)return[];let o=f==null?void 0:f.width;return e.filter(s=>{const r=C[t(s)];return o-=(r==null?void 0:r.width)??0,!(!r||o<0)})},[f,t,C,e]),x=l.useMemo(()=>{const o=new Set(I.map(t));return e.filter(s=>{const r=t(s);return!o.has(r)})},[t,e,I]),N=l.useMemo(()=>new Set(x.map(t)),[t,x]),g=l.useCallback((o,s)=>{if(!s)return;const r=t(o);j(a=>{const i=a[r];return(i==null?void 0:i.height)===s.height&&(i==null?void 0:i.width)===s.width?a:{...a,[r]:s}})},[t]);l.useEffect(()=>{j(o=>{const s=Object.keys(o),r=new Set(e.map(t)),a=[];for(const h of s)r.has(h)&&a.push(h);if(a.length===s.length)return o;const i={};for(const h of a)i[h]=o[h];return i})},[t,e]);const P=n.jsx(O,{ref:m,children:I.map((o,s)=>n.jsx(y,{item:o,index:s,ItemComponent:d,registerSize:g},t(o)))}),F=x.length?n.jsx(O,{allowOverflow:!0,children:e.map((o,s)=>n.jsx(y,{item:o,index:s,ItemComponent:d,registerSize:N.has(t(o))?g:L},t(o)))}):null,T=n.jsx(c,{items:x});return n.jsxs(n.Fragment,{children:[n.jsx(u,{items:P,overflowedItems:T}),n.jsx(q,{tabIndex:-1,children:F})]})}function y({registerSize:e,item:t,ItemComponent:d,index:c}){const[u,m]=M();return l.useEffect(()=>{e(t,m)},[t,m,e]),n.jsx(d,{index:c,item:t,itemRef:u})}function V({items:e,overflowedItems:t}){return n.jsxs(K,{children:[e,t]})}b.__docgenInfo={description:"",methods:[],displayName:"Overflow",props:{ContainerComponent:{defaultValue:{value:`function DefaultContainerComponent({
	items,
	overflowedItems,
}: OverflowContainerProps) {
	return (
		<DefaultContainer>
			{items}
			{overflowedItems}
		</DefaultContainer>
	);
}`,computed:!1},required:!1}}};const k=v.div`
	resize: horizontal;
	overflow: hidden;
`,Z={title:"overflow/Overflow"},W=({item:e,itemRef:t})=>n.jsx("div",{ref:t,children:n.jsx("div",{style:{padding:"8px 4px",boxSizing:"border-box"},children:n.jsx("span",{children:e.text})})}),$=({item:e,itemRef:t})=>n.jsx("span",{ref:t,children:e}),H=({items:e})=>n.jsxs("span",{children:["+",e.length]}),A=e=>e,B=e=>e.id.toString(),w=()=>{const[e]=l.useState(["hi","bye","goodbye","hello there","well well well well well well"]);return n.jsx(k,{children:n.jsx(b,{items:e,ItemComponent:$,OverflowedItemsComponent:H,getItemId:A})})},p=()=>{var c;const[e,t]=l.useState([{text:"hi",id:1},{text:"bye",id:2},{text:"goodbye",id:3},{text:"hello there",id:4},{text:"well well well well well well",id:5}]),d=l.useCallback(u=>{t(m=>[{text:u.target.value,id:1},...m.slice(1)])},[]);return n.jsxs(n.Fragment,{children:[n.jsx("input",{value:(c=e[0])==null?void 0:c.text,onChange:d}),n.jsx(k,{children:n.jsx(b,{items:e,ItemComponent:W,OverflowedItemsComponent:H,getItemId:B})})]})};w.__docgenInfo={description:"",methods:[],displayName:"Primary"};p.__docgenInfo={description:"",methods:[],displayName:"Objects"};var S,D,R;w.parameters={...w.parameters,docs:{...(S=w.parameters)==null?void 0:S.docs,source:{originalSource:`() => {
  const [items] = useState(['hi', 'bye', 'goodbye', 'hello there', 'well well well well well well']);
  return <ResizableDiv>
            <Overflow items={items} ItemComponent={StringItem} OverflowedItemsComponent={CountOverflow} getItemId={stringItemId} />
        </ResizableDiv>;
}`,...(R=(D=w.parameters)==null?void 0:D.docs)==null?void 0:R.source}}};var z,_,E;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`() => {
  const [items, setItems] = useState([{
    text: 'hi',
    id: 1
  }, {
    text: 'bye',
    id: 2
  }, {
    text: 'goodbye',
    id: 3
  }, {
    text: 'hello there',
    id: 4
  }, {
    text: 'well well well well well well',
    id: 5
  }]);
  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setItems(prev => [{
      text: e.target.value,
      id: 1
    }, ...prev.slice(1)]);
  }, []);
  return <>
            <input value={items[0]?.text} onChange={onInputChange} />
            <ResizableDiv>
                <Overflow items={items} ItemComponent={ObjectItem} OverflowedItemsComponent={CountOverflow} getItemId={objectItemId} />
            </ResizableDiv>
        </>;
}`,...(E=(_=p.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};export{p as Objects,w as Primary,Z as default};
