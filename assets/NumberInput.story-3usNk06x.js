import{j as u}from"./jsx-runtime-PJfywvQB.js";import{r as o}from"./index-tnPESBdE.js";import"./index-D_0btrl3.js";import{N as n}from"./useShowToast-BNVfI4Yq.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./useBooleanState-BvRGCuoP.js";import"./index-C4WGByT4.js";import"./fuse.esm-BSXXkDLL.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./inheritsLoose-XbxvykFZ.js";import"./useCombinedRefs-Dfiq_Z7b.js";import"./index-B9gZL0fq.js";const P={title:"core-ui/NumberInput",component:n},i=()=>{const[m,l]=o.useState(0),p=o.useCallback(e=>{console.log(e),l(e)},[]);return u.jsx(n,{value:m,onChange:p,label:"Please fill me out"})},t=i.bind({});var r,a,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const [state, setState] = useState(0);
  const handleSetState = useCallback((val: number) => {
    console.log(val);
    setState(val);
  }, []);
  return <NumberInput value={state} onChange={handleSetState} label="Please fill me out" />;
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};export{t as Primary,P as default};
