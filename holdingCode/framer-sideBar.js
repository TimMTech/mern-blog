const [open, cycleOpen] = useCycle(false, true);
const itemVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -2,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};
 <AnimatePresence>
   {open && (
     <MotionAside
       initial={{ width: 0 }}
       animate={{ width: 500 }}
       exit={{ width: 0, transition: { delay: 0.7, duration: 0.3 } }}
     >
       <MotionDiv
         initial="closed"
         animate="open"
         exit="closed"
         variants={sideVariants}
       >
         <MotionItems whileHover={{ scale: 1.1 }} variants={itemVariants}>
           <DashMenu />
         </MotionItems>
       </MotionDiv>
     </MotionAside>
   )}
 </AnimatePresence>;

 const MotionAside = styled(motion.aside)`
   background-color: rgb(52, 60, 85);
   min-height: 100vh;
   box-shadow: inset 0 0 5rem rgba(255, 255, 255, 0.5);
 `;

 const MotionDiv = styled(motion.div)``;

 const MotionItems = styled(motion.div)``;

 const OpenMenuButton = styled.button`
   font-family: "Prompt", sans-serif;
   font-weight: 900;
   font-size: 1.5em;
   border: 0.05rem solid rgb(0, 0, 0);
   padding: 0 1.5rem;
   margin-top: 2rem;
   margin-left: 2rem;
   color: rgb(255, 255, 255);
   cursor: pointer;
   background-color: rgb(33, 37, 41);
   border-radius: 0.25rem;
   align-self: flex-start;
 `;