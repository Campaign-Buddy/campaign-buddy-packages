import{j as a}from"./jsx-runtime-PJfywvQB.js";import"./parchmentTheme-CF6Ki9yW.js";import{a as S}from"./useShowToast-xIu4UuDl.js";import{r as t}from"./index-tnPESBdE.js";import"./index-C4WGByT4.js";import"./createSmartContext-lZxL_nvM.js";import{F as y,e as h}from"./exampleWidgets-Cmgz0Y2m.js";import{e as x,a as f,E as F,b}from"./ExampleUiSection-CAuPnHZq.js";import"./fuse.esm-DpGxg_dX.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./inheritsLoose-XbxvykFZ.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./index-DwWHXmyK.js";import"./useCombinedRefs-G3-tKQwR.js";import"./index-CNLxx85X.js";import"./navigateObject-ZMXbUPar.js";import"./jsonSchemaTypes-BjqZX6rF.js";const T={title:"form-generator/FieldSettings"},i=[{displayValue:"Game Master",id:"gm",data:"gm"},{displayValue:"Player",id:"player",data:"player"}],e=()=>{const[p,d]=t.useState({name:"Joseph Stewart",description:"This is a description",additionalProperties:{abc:{type:"string",title:"ABC"},easyAs123:{type:"number",title:"Easy as 123"}}}),[s,m]=t.useState(i[0]),[c,g]=t.useState({}),u=t.useCallback(o=>{console.log(o),d(o)},[]);return a.jsxs("div",{children:[a.jsx(S,{label:"Your role",options:i,value:s,onChange:m}),a.jsx(y,{schema:b,data:p,onChange:u,widgets:h,UiSection:F,uiLayout:f,aggregates:x,currentUserRole:s.data,fieldSettings:c,updateFieldSettings:g})]})};e.__docgenInfo={description:"",methods:[],displayName:"Primary"};var r,n,l;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
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
  const [role, setRole] = useState<IOption<string>>(roleOptions[0]);
  const [fieldSettings, setFieldSettings] = useState<EntityFieldSettings>({});
  const handleUpdate = useCallback((update: any) => {
    console.log(update);
    setData(update);
  }, []);
  return <div>
            <Select label="Your role" options={roleOptions} value={role} onChange={setRole} />
            <FormGenerator schema={exampleSchema} data={data} onChange={handleUpdate} widgets={exampleWidgets} UiSection={ExampleUiSection} uiLayout={exampleLayout} aggregates={exampleAggregation} currentUserRole={role.data} fieldSettings={fieldSettings} updateFieldSettings={setFieldSettings} />
        </div>;
}`,...(l=(n=e.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};export{e as Primary,T as default};
