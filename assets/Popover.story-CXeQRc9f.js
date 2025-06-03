import{j as t}from"./jsx-runtime-PJfywvQB.js";import{r as a}from"./index-tnPESBdE.js";import"./parchmentTheme-CF6Ki9yW.js";import{P as s,B as c}from"./useShowToast-CjhSvX3m.js";import"./fuse.esm-DpGxg_dX.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./inheritsLoose-XbxvykFZ.js";import"./index-C4WGByT4.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./index-DwWHXmyK.js";import"./useCombinedRefs-G3-tKQwR.js";import"./index-CNLxx85X.js";const S={title:"core-ui/Popover",component:s},l=()=>{const[i,e]=a.useState(!1);return t.jsx(s,{content:"I am content",onClose:()=>e(!1),isOpen:i,placement:"bottom",children:t.jsx(c,{onClick:()=>e(m=>!m),children:"Hi there"})})},o=l.bind({});var r,n,p;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return <Popover content="I am content" onClose={() => setIsPopoverOpen(false)} isOpen={isPopoverOpen} placement="bottom">
            <Button onClick={() => setIsPopoverOpen(prev => !prev)}>
                Hi there
            </Button>
        </Popover>;
}`,...(p=(n=o.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};export{o as Primary,S as default};
