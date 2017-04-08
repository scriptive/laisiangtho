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
app.nav.menu=function(e){
  app.Toggle.nav(e,function(){
    document.body.classList.add('nav');
  },function(){
    document.body.classList.remove('nav');
  });
};