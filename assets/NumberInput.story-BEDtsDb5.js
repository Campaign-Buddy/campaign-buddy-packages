import{j as u}from"./jsx-runtime-PJfywvQB.js";import{r as o}from"./index-tnPESBdE.js";import"./parchmentTheme-CF6Ki9yW.js";import{N as n}from"./useShowToast-CjhSvX3m.js";import"./fuse.esm-DpGxg_dX.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./inheritsLoose-XbxvykFZ.js";import"./index-C4WGByT4.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./index-DwWHXmyK.js";import"./useCombinedRefs-G3-tKQwR.js";import"./index-CNLxx85X.js";const P={title:"core-ui/NumberInput",component:n},i=()=>{const[m,l]=o.useState(0),p=o.useCallback(e=>{console.log(e),l(e)},[]);return u.jsx(n,{value:m,onChange:p,label:"Please fill me out"})},t=i.bind({});var r,a,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const [state, setState] = useState(0);
  const handleSetState = useCallback((val: number) => {
    console.log(val);
    setState(val);
  }, []);
  return <NumberInput value={state} onChange={handleSetState} label="Please fill me out" />;
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};export{t as Primary,P as default};
