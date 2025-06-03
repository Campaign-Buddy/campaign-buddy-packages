import{j as o}from"./jsx-runtime-PJfywvQB.js";import{r as c}from"./index-tnPESBdE.js";import{B as d}from"./Button-CbZJaR2o.js";import{D as t}from"./DropdownMenu-BsBGI1bt.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./iframe-DLiZLbIA.js";import"./index-DwWHXmyK.js";import"./index-C4WGByT4.js";import"./CompositeControl-Djc9f6Ar.js";import"./navigateObject-ZMXbUPar.js";import"./parchmentTheme-CF6Ki9yW.js";import"./useUpdatingRef-CQrjiaKT.js";import"./useCombinedRefs-G3-tKQwR.js";import"./index-ChYhBiAs.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";const B={component:t,title:"primitive-ui/Dropdown"};function e(){const[s,r]=c.useState(!1);return o.jsxs(t,{isOpen:s,setIsOpen:r,children:[o.jsx(t.Reference,{children:o.jsx(d,{onClick:()=>r(m=>!m),rightIcon:"chevronDown",children:"Click me"})}),o.jsx(t.Content,{children:o.jsx("div",{style:{width:"200px",height:"200px"},children:"Content!"})})]})}e.__docgenInfo={description:"",methods:[],displayName:"Primary"};var n,i,p;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`function Primary() {
  const [isOpen, setIsOpen] = useState(false);
  return <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
            <Dropdown.Reference>
                <Button onClick={() => setIsOpen(p => !p)} rightIcon="chevronDown">
                    Click me
                </Button>
            </Dropdown.Reference>
            <Dropdown.Content>
                <div style={{
        width: '200px',
        height: '200px'
      }}>
                    Content!
                </div>
            </Dropdown.Content>
        </Dropdown>;
}`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};export{e as Primary,B as default};
