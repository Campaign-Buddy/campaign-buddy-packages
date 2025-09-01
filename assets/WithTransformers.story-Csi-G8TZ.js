import{j as n}from"./jsx-runtime-PJfywvQB.js";import{D as y,u as c,a as d,S as u,C as m,B as p,c as f}from"./ExampleComponents-DQv9tFQx.js";import"./index-tnPESBdE.js";import"./index-C4WGByT4.js";import"./useUpdatingRef-CQrjiaKT.js";import"./isObjectLike-C4XLuBz8.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./index-D_0btrl3.js";import"./useShowToast-DNWSesNN.js";import"./useBooleanState-BvRGCuoP.js";import"./fuse.esm-BSXXkDLL.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./inheritsLoose-XbxvykFZ.js";import"./useCombinedRefs-Dfiq_Z7b.js";import"./index-B9gZL0fq.js";import"./backgroundColor-DgtptAGf.js";import"./navigateObject-ZMXbUPar.js";import"./index-q1RHaYn3.js";class R{constructor(){this.tryTransform=(r,e)=>{const t={[r.kind]:r};if(t[e])return t[e];const a=this.transformers.find(i=>i.from===r.kind&&i.to===e);if(a)return a.transform(r)},this.addTransformer=(r,e,t)=>(this.transformers.push({to:e,from:r,transform:t}),this),this.transformers=[]}}const h=new R().addTransformer("entity","pane",o=>({kind:"pane",tabName:o.entityName,location:"some location"})),z={title:"drag-drop/WithTransformers",decorators:[o=>n.jsx(y,{dragDataTransformer:h,children:n.jsx(o,{})})]};function s(){const{dragRef:o}=c({kind:"pane",location:"somelocation",tabName:"Some Tab"}),{dropRef:r}=d("pane",f.isOver,(a,i)=>{console.log(a,i)}),{dragRef:e}=c({kind:"entity",entityId:"12345",entityName:"Bob"}),{dropRef:t}=d("entity",f.isOver,(a,i)=>{console.log(a,i)});return n.jsxs(u,{children:[n.jsxs(m,{children:[n.jsx(p,{ref:o,children:"I drag as a pane"}),n.jsx(p,{ref:r,children:"I accept pane drops"})]}),n.jsxs(m,{children:[n.jsx(p,{ref:e,children:"I drag as an entity"}),n.jsx(p,{ref:t,children:"I accept entity drops"})]})]})}s.__docgenInfo={description:"",methods:[],displayName:"BasicDragDrop"};var l,g,D;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`function BasicDragDrop() {
  const {
    dragRef: paneDragRef
  } = useDrag({
    kind: 'pane',
    location: 'somelocation',
    tabName: 'Some Tab'
  });
  const {
    dropRef: paneDropRef
  } = useSectionedDropZone('pane', coordinateTransformers.isOver, (location, item) => {
    console.log(location, item);
  });
  const {
    dragRef: entityDragRef
  } = useDrag({
    kind: 'entity',
    entityId: '12345',
    entityName: 'Bob'
  });
  const {
    dropRef: entityDropRef
  } = useSectionedDropZone('entity', coordinateTransformers.isOver, (location, item) => {
    console.log(location, item);
  });
  return <Stack>
            <Container>
                <Bin ref={paneDragRef}>I drag as a pane</Bin>
                <Bin ref={paneDropRef}>I accept pane drops</Bin>
            </Container>
            <Container>
                <Bin ref={entityDragRef}>I drag as an entity</Bin>
                <Bin ref={entityDropRef}>I accept entity drops</Bin>
            </Container>
        </Stack>;
}`,...(D=(g=s.parameters)==null?void 0:g.docs)==null?void 0:D.source}}};export{s as BasicDragDrop,z as default};
