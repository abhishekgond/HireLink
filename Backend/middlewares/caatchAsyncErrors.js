export const catchAsyncErrors=()=>{
  return (req,res,next)=>{
    Promise.resolve(theFunction(req,res,next)).catch(error);
  };
}