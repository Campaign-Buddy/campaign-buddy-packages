import{j as e}from"./jsx-runtime-PJfywvQB.js";import{r as f}from"./index-tnPESBdE.js";import"./parchmentTheme-CF6Ki9yW.js";import{M as g,B as C,m as I,C as M}from"./useShowToast-CjhSvX3m.js";import"./fuse.esm-DpGxg_dX.js";import"./index-BJt650PE.js";import"./index-aBkx2qY1.js";import"./inheritsLoose-XbxvykFZ.js";import"./index-C4WGByT4.js";import"./styled-components.browser.esm-CuL3HyEV.js";import"./index-DwWHXmyK.js";import"./useCombinedRefs-G3-tKQwR.js";import"./index-CNLxx85X.js";const F={title:"core-ui/MenuPopover",component:g},k=[{icon:"align-left",altText:"Align left"},{icon:"align-center",altText:"Align center"},{icon:"align-right",altText:"Align right"},{icon:"align-justify",altText:"Align justify"}],y=[{displayText:"Save",icon:"floppy-disk",onClick:()=>console.log("save")},{displayText:"New",icon:"plus",onClick:()=>console.log("new")},{displayText:"More",icon:"more",subItems:[{displayText:"Sub A"},{displayText:"Sub B"}]}];function o(){const[i,n]=f.useState(!1);return e.jsx(g,{items:y,onClose:()=>n(!1),isOpen:i,children:e.jsx(C,{variant:"minimal",onClick:()=>n(!0),children:"File"})})}function t(){const[i,n]=f.useState(!1);return e.jsx(I,{items:k,onClose:()=>n(!1),isOpen:i,children:e.jsx(C,{variant:"minimal",onClick:()=>n(!0),icon:"align-center"})})}function s(){return e.jsx(M,{menuItems:[{displayText:"Foo",icon:"add",onClick:()=>console.log("foo clicked")},{displayText:"Bar",icon:"minus",subItems:[{displayText:"Baz",icon:"blank",onClick:()=>console.log("baz clicked"),shouldCloseMenuOnClick:!1}]}],children:e.jsx("p",{children:"Right click on me"})})}o.__docgenInfo={description:"",methods:[],displayName:"Primary"};t.__docgenInfo={description:"",methods:[],displayName:"IconMenu"};s.__docgenInfo={description:"",methods:[],displayName:"ContextMenuExample"};var r,a,c;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`function Primary() {
  const [isOpen, setIsOpen] = useState(false);
  return <MenuPopover items={items} onClose={() => setIsOpen(false)} isOpen={isOpen}>
            <Button variant="minimal" onClick={() => setIsOpen(true)}>
                File
            </Button>
        </MenuPopover>;
}`,...(c=(a=o.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};var l,p,u;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`function IconMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return <IconMenuPopover items={iconMenuItems} onClose={() => setIsOpen(false)} isOpen={isOpen}>
            <Button variant="minimal" onClick={() => setIsOpen(true)} icon="align-center" />
        </IconMenuPopover>;
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,d,x;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`function ContextMenuExample() {
  return <ContextMenu menuItems={[{
    displayText: 'Foo',
    icon: 'add',
    onClick: () => console.log('foo clicked')
  }, {
    displayText: 'Bar',
    icon: 'minus',
    subItems: [{
      displayText: 'Baz',
      icon: 'blank',
      onClick: () => console.log('baz clicked'),
      shouldCloseMenuOnClick: false
    }]
  }]}>
            <p>Right click on me</p>
        </ContextMenu>;
}`,...(x=(d=s.parameters)==null?void 0:d.docs)==null?void 0:x.source}}};export{s as ContextMenuExample,t as IconMenu,o as Primary,F as default};
