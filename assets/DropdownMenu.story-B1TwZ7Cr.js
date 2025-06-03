import{j as o}from"./jsx-runtime-PJfywvQB.js";import"./Button-CbZJaR2o.js";import{a as e}from"./DropdownMenu-BsBGI1bt.js";import{r as i}from"./index-tnPESBdE.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./iframe-DLiZLbIA.js";import"./index-DwWHXmyK.js";import"./index-C4WGByT4.js";import"./CompositeControl-Djc9f6Ar.js";import"./navigateObject-ZMXbUPar.js";import"./parchmentTheme-CF6Ki9yW.js";import"./useUpdatingRef-CQrjiaKT.js";import"./useCombinedRefs-G3-tKQwR.js";import"./index-ChYhBiAs.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";const g={title:"primitive-ui/DropdownMenu",component:e};function t(){const[l,n]=i.useState(!1),[r,s]=i.useState(!1);return o.jsxs(e,{isOpen:l,setIsOpen:n,children:[o.jsx(e.Button,{onClick:()=>n(d=>!d),children:"Open"}),o.jsxs(e.Content,{children:[o.jsx(e.Item,{icon:"note",onClick:()=>alert("hi"),children:"Say Hi"}),o.jsx(e.Item,{onClick:()=>alert("goodbye"),children:"Say Goodbye"}),o.jsx(e.Item,{children:"I am some really long text but you can't click me"}),o.jsx(e.Item,{isSelected:r,onClick:()=>s(!0),children:"Select me!"}),o.jsx(e.Divider,{}),o.jsx(e.Item,{isSelected:!r,onClick:()=>s(!1),children:"No select me!"})]})]})}t.__docgenInfo={description:"",methods:[],displayName:"Primary"};var p,c,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`function Primary() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  return <DropdownMenu isOpen={isOpen} setIsOpen={setIsOpen}>
            <DropdownMenu.Button onClick={() => setIsOpen(p => !p)}>
                Open
            </DropdownMenu.Button>
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
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};export{t as Primary,g as default};
