import{j as t}from"./jsx-runtime-PJfywvQB.js";import{r as i}from"./index-tnPESBdE.js";import"./index-D_0btrl3.js";import{S as y,a as A}from"./useShowToast-DNWSesNN.js";import"./index-C4WGByT4.js";import{M as w,a}from"./ImageGrid-BPNgWImq.js";import{F as v,a as b,w as f}from"./index-DAGpjJtu.js";import{a as C,b as R}from"./aggregationAudit-B77lJpmO.js";import"./index.esm-CPT3nVmo.js";import{Q as x}from"./queryClient-C86Hojab.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./useBooleanState-BvRGCuoP.js";import"./fuse.esm-BSXXkDLL.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./inheritsLoose-XbxvykFZ.js";import"./useCombinedRefs-Dfiq_Z7b.js";import"./index-B9gZL0fq.js";import"./jsonSchemaTypes-BjqZX6rF.js";import"./createSmartContext-BVs5Jhf5.js";import"./navigateObject-ZMXbUPar.js";import"./ImagePickerMenu-CLHp6kTt.js";import"./isObjectLike-C4XLuBz8.js";import"./index-ChYhBiAs.js";import"./index-go6VP56j.js";const et={title:"form-generator-widgets/AggregationAudit"},F=new w,I=new x,M=new a(a.defaultOptions),s=[{displayValue:"GM",id:"gm",data:"gm"},{displayValue:"Player",id:"player",data:"player"}],j=[{label:"GMs only",roles:["gm"]},{label:"GMs and players",roles:["gm","player"]}],o=()=>{const[d,m]=i.useState({}),[r,c]=i.useState(!0),[e,u]=i.useState(s[0]),[p,S]=i.useState({}),h=i.useMemo(()=>({canUpdateAggregationSettings:e.id==="gm",canUpdateVisibilitySettings:e.id==="gm"}),[e]);return t.jsxs("div",{children:[t.jsx("div",{style:{marginBottom:"16px"},children:t.jsx(y,{label:"Show aggregation icon",value:r,onChange:c})}),t.jsx(A,{label:"Current user role",options:s,onChange:u,value:e}),t.jsx(v,{mediaApi:F,queryClient:I,visibilitySettings:j,availableActions:h,showAggregationIndicator:r,children:t.jsx(b,{data:d,onChange:m,schema:R,uiLayout:C,widgets:f,entityApi:M,fieldSettings:p,updateFieldSettings:S,currentUserRole:e.id})})]})};o.__docgenInfo={description:"",methods:[],displayName:"Primary"};var n,g,l;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  const [state, setState] = useState({});
  const [shouldShowAggregationIcon, setShouldShowAggregationIcon] = useState(true);
  const [currentRole, setCurrentRole] = useState(roleOptions[0]);
  const [fieldSettings, setFieldSettings] = useState<EntityFieldSettings>({});
  const availableActions = useMemo(() => ({
    canUpdateAggregationSettings: currentRole.id === 'gm',
    canUpdateVisibilitySettings: currentRole.id === 'gm'
  }), [currentRole]);
  return <div>
            <div style={{
      marginBottom: '16px'
    }}>
                <Switch label="Show aggregation icon" value={shouldShowAggregationIcon} onChange={setShouldShowAggregationIcon} />
            </div>
            <Select label="Current user role" options={roleOptions} onChange={setCurrentRole} value={currentRole} />
            <FormWidgetProvider mediaApi={mediaApi} queryClient={queryClient} visibilitySettings={visibilitySettings} availableActions={availableActions} showAggregationIndicator={shouldShowAggregationIcon}>
                <FormGenerator data={state} onChange={setState} schema={aggregationAuditSchema} uiLayout={aggregationAuditLayout} widgets={widgets} entityApi={entityApi} fieldSettings={fieldSettings} updateFieldSettings={setFieldSettings} currentUserRole={currentRole.id} />
            </FormWidgetProvider>
        </div>;
}`,...(l=(g=o.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};export{o as Primary,et as default};
