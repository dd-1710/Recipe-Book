import { HttpInterceptorFn } from '@angular/common/http';

export const recipeInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwtToken')
  console.log("Recipe Interceptor");
  if(token){
     const headers = req.clone({
    setHeaders:{'Authorization':'Bearer'+' '+ token}
  })
  return next(headers);

  }
 
  return next(req);
};
