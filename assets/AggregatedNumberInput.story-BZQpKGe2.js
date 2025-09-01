import{j as e}from"./jsx-runtime-PJfywvQB.js";import{r as p}from"./index-tnPESBdE.js";import"./index-D_0btrl3.js";import{A as g,I as o}from"./useShowToast-BNVfI4Yq.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./useBooleanState-BvRGCuoP.js";import"./index-C4WGByT4.js";import"./fuse.esm-BSXXkDLL.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./inheritsLoose-XbxvykFZ.js";import"./useCombinedRefs-Dfiq_Z7b.js";import"./index-B9gZL0fq.js";const S={title:"core-ui/AggregatedNumberInput",component:g},i=()=>{const[t,u]=p.useState(0),l=t+10;return e.jsxs(e.Fragment,{children:[e.jsx(o,{value:"Hi",onChange:console.log}),e.jsx(g,{value:t,label:"Add ten aggregation",onChange:u,aggregatedDisplayValue:`${l}`,baseValueLabel:"Base value",aggregationDescription:"Computed value = <base> + 10"}),e.jsx(o,{value:"Bye",onChange:console.log})]})},a=i.bind({});var r,n,s;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const [state, setState] = useState(0);
  const aggregatedValue = state + 10;
  return <>
            <Input value="Hi" onChange={console.log} />
            <AggregatedNumberInput value={state} label="Add ten aggregation" onChange={setState} aggregatedDisplayValue={\`\${aggregatedValue}\`} baseValueLabel="Base value" aggregationDescription="Computed value = <base> + 10" />
            <Input value="Bye" onChange={console.log} />
        </>;
}`,...(s=(n=a.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};export{a as Primary,S as default};
