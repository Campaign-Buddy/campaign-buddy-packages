import{j as o}from"./jsx-runtime-PJfywvQB.js";import"./Button-CSgIS09r.js";import{a as e}from"./Truncated-CowLbI91.js";import{r as s}from"./index-tnPESBdE.js";import"./backgroundColor-DgtptAGf.js";import"./navigateObject-ZMXbUPar.js";import"./index-D_0btrl3.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./iframe-Bt_IFqIv.js";import"./index-C4WGByT4.js";import"./useCombinedRefs-Dfiq_Z7b.js";import"./CompositeControl-06XT_jRg.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./useUpdatingRef-CQrjiaKT.js";import"./index-ChYhBiAs.js";import"./useResizeObserver-Dyd7CEVH.js";const g={title:"primitive-ui/DropdownMenu",component:e};function t(){const[c,d]=s.useState(!1),[n,r]=s.useState(!1);return o.jsxs(e,{isOpen:c,setIsOpen:d,children:[o.jsx(e.Button,{children:"Open"}),o.jsxs(e.Content,{children:[o.jsx(e.Item,{icon:"note",onClick:()=>alert("hi"),children:"Say Hi"}),o.jsx(e.Item,{onClick:()=>alert("goodbye"),children:"Say Goodbye"}),o.jsx(e.Item,{children:"I am some really long text but you can't click me"}),o.jsx(e.Item,{isSelected:n,onClick:()=>r(!0),children:"Select me!"}),o.jsx(e.Divider,{}),o.jsx(e.Item,{isSelected:!n,onClick:()=>r(!1),children:"No select me!"})]})]})}t.__docgenInfo={description:"",methods:[],displayName:"Primary"};var i,p,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`function Primary() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  return <DropdownMenu isOpen={isOpen} setIsOpen={setIsOpen}>
            <DropdownMenu.Button>Open</DropdownMenu.Button>
            <DropdownMenu.Content>
                <DropdownMenu.Item icon="note" onClick={() => alert('hi')}>
                    Say Hi
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => alert('goodbye')}>
                    Say Goodbye
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    I am some really long text but you can't click me
                </DropdownMenu.Item>
                <DropdownMenu.Item isSelected={isSelected} onClick={() => setIsSelected(true)}>
                    Select me!
                </DropdownMenu.Item>
                <DropdownMenu.Divider />
                <DropdownMenu.Item isSelected={!isSelected} onClick={() => setIsSelected(false)}>
                    No select me!
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu>;
}`,...(m=(p=t.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};export{t as Primary,g as default};
