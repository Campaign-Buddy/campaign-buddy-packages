import{j as a}from"./jsx-runtime-PJfywvQB.js";import{r as C}from"./index-tnPESBdE.js";import{u as x,Q as b,a as v}from"./index.esm-CPT3nVmo.js";import{H as i,C as $}from"./styled-components.browser.esm-CuL3HyEV.js";import{Q as j}from"./queryClient-C86Hojab.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./inheritsLoose-XbxvykFZ.js";const q=i.div`
	display: grid;
	grid-template-columns: ${({isSmallViewport:e,rowHeight:r})=>e?"100%":`repeat(auto-fill, minmax(${r}px, 1fr))`};
	grid-auto-rows: ${({rowHeight:e})=>e}px;
	grid-auto-flow: row dense;
	gap: 4px;
`,d=$`
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
	border-radius: 4px;
`,R=i.div`
	${d}
	grid-row: span 2 / auto;
`,k=i.div`
	${d}
	${({isSmallViewport:e})=>!e&&"grid-column: span 2 / auto;"}
`,G=i.div`
	${d}
`,L=i.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`,Q=i.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	cursor: pointer;
	transition: background-color 0.2s;

	&:hover {
		background-color: rgba(0, 0, 0, 0.6);
	}
`;function T(e){const r=x(e.map(t=>({queryKey:["package-campaign-buddy-image-grid",t.url],queryFn:()=>M(t)}))),o=r.some(t=>t.isLoading);return{loadedImages:o?void 0:r.map(t=>t.data).filter(t=>!!t),isLoading:o}}function M(e){const r=new Image;return new Promise((o,t)=>{r.onload=()=>{o({...e,width:r.width,height:r.height})},r.onerror=s=>{t(s)},r.src=e.url})}const _=({images:e,rowHeight:r=240,onImageClicked:o,fallback:t=null})=>{const{loadedImages:s,isLoading:y}=T(e),{width:c,ref:I}=v(),u=c!==void 0&&c<r*2;return y||!s?t:a.jsx(q,{ref:I,isSmallViewport:u,rowHeight:r,children:s.map((m,w)=>a.jsx(E,{isSmallViewport:u,image:m,onClick:o&&(()=>o(m,w))},`${m.url};${m.alt}`))})},E=({image:e,isSmallViewport:r,onClick:o})=>{const t=P(e);return a.jsxs(t,{isSmallViewport:r,children:[a.jsx(L,{src:e.url,alt:e.alt}),o&&a.jsx(Q,{role:"button",onClick:o,tabIndex:0})]})};function P(e){const r=e.width/e.height;return r>=1.5?k:r>=.75?G:R}const l=({queryClient:e,...r})=>a.jsx(b,{client:e,children:a.jsx(_,{...r})});l.__docgenInfo={description:"",methods:[],displayName:"ImageGrid",props:{images:{required:!0,tsType:{name:"Array",elements:[{name:"Image"}],raw:"Image[]"},description:""},rowHeight:{required:!1,tsType:{name:"number"},description:""},onImageClicked:{required:!1,tsType:{name:"signature",type:"function",raw:"(image: Image, index: number) => void",signature:{arguments:[{type:{name:"Image"},name:"image"},{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},fallback:{required:!1,tsType:{name:"ReactReactElement",raw:"React.ReactElement"},description:""},queryClient:{required:!0,tsType:{name:"QueryClient"},description:""}}};const W={title:"image-grid/ImageGrid",component:l},S=e=>Array(e).fill(0).map(()=>{const r=Math.random().toString().substring(2),o=g(10,30),t=g(10,30);return{url:`https://picsum.photos/seed/${r}/${o*50}/${t*50}`,alt:`Random picsum with seed = ${r}`}}),g=(e,r)=>Math.floor(Math.random()*(r-e+1)+e),A=new j,n=()=>{const e=C.useMemo(()=>S(20),[]);return a.jsx(l,{queryClient:A,images:e,onImageClicked:r=>console.log(r),fallback:a.jsx("p",{children:"Loading..."})})};n.__docgenInfo={description:"",methods:[],displayName:"Primary"};var p,h,f;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const images = useMemo(() => getImages(20), []);
  return <ImageGrid queryClient={queryClient} images={images} onImageClicked={image => console.log(image)} fallback={<p>Loading...</p>} />;
}`,...(f=(h=n.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};export{n as Primary,W as default};
