import{j as n}from"./jsx-runtime-PJfywvQB.js";import{D as R,u as i,a as s,S as y,C as p,B as r,c}from"./ExampleComponents-DQv9tFQx.js";import"./index-tnPESBdE.js";import"./index-C4WGByT4.js";import"./useUpdatingRef-CQrjiaKT.js";import"./isObjectLike-C4XLuBz8.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./index-D_0btrl3.js";import"./useShowToast-DNWSesNN.js";import"./useBooleanState-BvRGCuoP.js";import"./fuse.esm-BSXXkDLL.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./inheritsLoose-XbxvykFZ.js";import"./useCombinedRefs-Dfiq_Z7b.js";import"./index-B9gZL0fq.js";import"./backgroundColor-DgtptAGf.js";import"./navigateObject-ZMXbUPar.js";import"./index-q1RHaYn3.js";const w={title:"drag-drop/NoTransformers",decorators:[o=>n.jsx(R,{children:n.jsx(o,{})})]};function e(){const{dragRef:o}=i({kind:"pane",location:"somelocation",tabName:"Some Tab"}),{dropRef:g}=s("pane",c.isOver,(t,a)=>{console.log(t,a)}),{dragRef:l}=i({kind:"entity",entityId:"12345",entityName:"Bob"}),{dropRef:D}=s("entity",c.isOver,(t,a)=>{console.log(t,a)});return n.jsxs(y,{children:[n.jsxs(p,{children:[n.jsx(r,{ref:o,children:"I drag as a pane"}),n.jsx(r,{ref:g,children:"I accept pane drops"})]}),n.jsxs(p,{children:[n.jsx(r,{ref:l,children:"I drag as an entity"}),n.jsx(r,{ref:D,children:"I accept entity drops"})]})]})}e.__docgenInfo={description:"",methods:[],displayName:"BasicDragDrop"};var d,m,f;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`function BasicDragDrop() {
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
}`,...(f=(m=e.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};export{e as BasicDragDrop,w as default};
