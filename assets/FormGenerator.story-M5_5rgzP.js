import{j as c}from"./jsx-runtime-PJfywvQB.js";import"./createSmartContext-lZxL_nvM.js";import{r as a}from"./index-tnPESBdE.js";import"./index-C4WGByT4.js";import{F as n,e as d}from"./exampleWidgets-Cmgz0Y2m.js";import{a as l,E as u,b as y}from"./ExampleUiSection-CAuPnHZq.js";import"./navigateObject-ZMXbUPar.js";import"./fuse.esm-DpGxg_dX.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./inheritsLoose-XbxvykFZ.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./parchmentTheme-CF6Ki9yW.js";import"./useShowToast-xIu4UuDl.js";import"./index-DwWHXmyK.js";import"./useCombinedRefs-G3-tKQwR.js";import"./index-CNLxx85X.js";import"./jsonSchemaTypes-BjqZX6rF.js";const B={title:"form-generator/FormGenerator",component:n},h=()=>{const[i,p]=a.useState({name:"Joseph Stewart",description:"This is a description",additionalProperties:{abc:{type:"string",title:"ABC"},easyAs123:{type:"number",title:"Easy as 123"}}}),m=a.useCallback(t=>{console.log(t),p(t)},[]);return c.jsx(n,{schema:y,data:i,onChange:m,widgets:d,UiSection:u,uiLayout:l})},e=h.bind({});var o,r,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const [data, setData] = useState({
    name: 'Joseph Stewart',
    description: 'This is a description',
    additionalProperties: {
      abc: {
        type: 'string',
        title: 'ABC'
      },
      easyAs123: {
        type: 'number',
        title: 'Easy as 123'
      }
    }
  });
  const handleUpdate = useCallback((update: any) => {
    console.log(update);
    setData(update);
  }, []);
  return <FormGenerator schema={exampleSchema} data={data} onChange={handleUpdate} widgets={exampleWidgets} UiSection={ExampleUiSection} uiLayout={exampleLayout} />;
}`,...(s=(r=e.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};export{e as Primary,B as default};
