// NOTE: temp
/*
Object.defineProperties(app.nav,{
  menu:{
    value:function(e){
      app.Toggle.nav(e,function(){
        document.body.classList.add('nav');
      },function(){
        document.body.classList.remove('nav');
      });
    }
  },
});
*/
app.nav.menu=function(n){app.Toggle.nav(n,function(){document.body.classList.add("nav")},function(){document.body.classList.remove("nav")})};