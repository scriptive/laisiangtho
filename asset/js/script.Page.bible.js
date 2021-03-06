bible:function(resolve, reject){
  var configuration = app.config, local = app.localStorage, ol=document.createElement('ol');
  // app.Toggle.main(true).appendChild(ol);
  app.Toggle.main(true).appendChild(ol).setAttribute('class','main-bible');
  app.bible.all.each(function(bId,bible){
    var li=document.createElement('li'), p=document.createElement('p'), a=document.createElement('a'), download=document.createElement('span'), 
    dragable=document.createElement('span');
    li.setAttribute('id',bId);
    dragable.setAttribute('class','drag icon-menu');
    // dragable.innerHTML="drag";
    a.innerHTML=bible.id.name;
    a.setAttribute('href',{bible:bId}.paramater(['#book']));
    // download.setAttribute('class','file');
    if (bible.id.hasOwnProperty('local')) {
      download.setAttribute('class','icon-ok offline');
    } else if (app.bible.file.hasOwnProperty(bId)) {
      download.setAttribute('class','icon-attention offline');
    } else {
      download.setAttribute('class','icon-cloud online');
    }
    p.appendChild(download);
    p.appendChild(a);
    p.appendChild(dragable);
    li.setAttribute('class','reorder');
    if (bId == local.name.query.bible)li.classList.add('active');
    
    li.appendChild(p);
    ol.appendChild(li);
    
    download.eventClick(function(event){
      var o = event.target; 
      if (o.classList.contains("offline")){
        app.Toggle.dialog(function(container){
          // NOTE: Open
          var p=document.createElement('p');
          p.innerHTML=app.bible.lang('isLocalRemove').replace('{is}',bible.id.name);
          container.appendChild(p);
        },function(container){
          return new app.xml(bId).delete().then(function(){
            o.setAttribute('class','icon-cloud online');
          });
        });
      } else {
        var temp = o.parentNode.firstElementChild.nextElementSibling;
        new app.xml(bId).download(function(){
          o.setAttribute('class','icon-loading animate-spin');
        }).then(function(e){
          new app.xml(bId).save(e).then(function(){
            o.setAttribute('class','icon-ok offline');
          },function(){
            o.setAttribute('class','icon-attention offline');
          });
        });
      }
    },false);
  }), resolve();
  /*
  new Sortable(ol, {
  // handle: '.drag',
  // animation: 150,
  // forceFallback: true,
  // preventOnFilter: true,
  // sort: true,

  // group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
	sort: true,  // sorting inside list
	// delay: 0, // time in milliseconds to define when the sorting should start
	// disabled: false, // Disables the sortable if set to true.
	// store: null,  // @see Store
	animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
	handle: ".drag",  // Drag handle selector within list items
	filter: ".ignore-elements",  // Selectors that do not lead to dragging (String or Function)
	// preventOnFilter: true, // Call `event.preventDefault()` when triggered `filter`
	draggable: "li",  // Specifies which items inside the element should be draggable
	ghostClass: "drag-ghost",  // Class name for the drop placeholder
	chosenClass: "drag-chosen",  // Class name for the chosen item
	dragClass: "sortable-drag",  // Class name for the dragging item
	// dataIdAttr: 'data-id',

	forceFallback: false,  // ignore the HTML5 DnD behaviour and force the fallback to kick in

	fallbackClass: "drag-fallback",  // Class name for the cloned DOM Element when using forceFallback
	fallbackOnBody: false,  // Appends the cloned DOM Element into the Document's Body
	fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.        
	
	// scroll: true, // or HTMLElement
	// scrollFn: function(offsetX, offsetY, originalEvent) { ... }, // if you have custom scrollbar scrollFn may be used for autoscrolling
	// scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
	// scrollSpeed: 10, // px
  
  onUpdate: function (e) {
      var bible = app.bible, bibleLocal={},bibleAll={};
      bible.available=[];
      e.target.childNodes.forEach(function(el,i){
        var id = el.getAttribute('id');
        bible.available.push(id);
        bibleLocal[id]=local.name.bible[id];
        bibleAll[id]=bible.all[id];
      });
      local.update('bible',bibleLocal);
      bible.all=bibleAll;
    },
  });
  */
  if (app.config.Screen =='mobile'){
    // console.log('ues');
    ol.addEventListener('slip:beforereorder', function(e){
      // if (/reorder/.test(e.target.className))e.preventDefault();
    }, false);
    ol.addEventListener('slip:beforeswipe', function(e){
      // e.preventDefault();
      // if (e.target.parentNode.nodeName == 'OL' || e.target.parentNode.nodeName == 'P' )e.preventDefault();
      // if (/reorder/.test(e.target.className))e.preventDefault();
    }, false);
    
    ol.addEventListener('slip:beforewait', function(e){
      if (e.target.className.indexOf('drag') > -1) e.preventDefault();
    }, false);
    
    ol.addEventListener('slip:afterswipe', function(e){
      e.target.parentNode.appendChild(e.target);
      // if (e.target.nodeName == 'INPUT' || /reorder/.test(e.target.className))e.preventDefault();
    }, false);
  
    ol.addEventListener('slip:reorder', function(e){
        e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
        var bible = app.bible, bibleLocal={},bibleAll={};
        bible.available=[];
        e.target.parentNode.childNodes.forEach(function(el,i){
          var id = el.getAttribute('id');
          bible.available.push(id);
          bibleLocal[id]=local.name.bible[id];
          bibleAll[id]=bible.all[id];
        });
        local.update('bible',bibleLocal);
        bible.all=bibleAll;
        return false;
    }, false);
  
    new Slip(ol);
  } else {
    new Sortable(ol, {
    handle: '.drag',
    animation: 150,
    onUpdate: function (e) {
        var bible = app.bible, bibleLocal={},bibleAll={};
        bible.available=[];
        e.target.childNodes.forEach(function(el,i){
          var id = el.getAttribute('id');
          bible.available.push(id);
          bibleLocal[id]=local.name.bible[id];
          bibleAll[id]=bible.all[id];
        });
        local.update('bible',bibleLocal);
        bible.all=bibleAll;
      },
    });
  }
  /*
  if (window['Slip']){
    // console.log('ues');
    ol.addEventListener('slip:beforereorder', function(e){
      // if (/reorder/.test(e.target.className))e.preventDefault();
    }, false);
    ol.addEventListener('slip:beforeswipe', function(e){
      // e.preventDefault();
      // if (e.target.parentNode.nodeName == 'OL' || e.target.parentNode.nodeName == 'P' )e.preventDefault();
      // if (/reorder/.test(e.target.className))e.preventDefault();
    }, false);
    
    ol.addEventListener('slip:beforewait', function(e){
      if (e.target.className.indexOf('drag') > -1) e.preventDefault();
    }, false);
    
    ol.addEventListener('slip:afterswipe', function(e){
      e.target.parentNode.appendChild(e.target);
      // if (e.target.nodeName == 'INPUT' || /reorder/.test(e.target.className))e.preventDefault();
    }, false);
  
    ol.addEventListener('slip:reorder', function(e){
        e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
        var bible = app.bible, bibleLocal={},bibleAll={};
        bible.available=[];
        e.target.parentNode.childNodes.forEach(function(el,i){
          var id = el.getAttribute('id');
          bible.available.push(id);
          bibleLocal[id]=local.name.bible[id];
          bibleAll[id]=bible.all[id];
        });
        local.update('bible',bibleLocal);
        bible.all=bibleAll;
        return false;
    }, false);
  
    new Slip(ol);
  } else {
    new Sortable(ol, {
    handle: '.drag',
    animation: 150,
    onUpdate: function (e) {
        var bible = app.bible, bibleLocal={},bibleAll={};
        bible.available=[];
        e.target.childNodes.forEach(function(el,i){
          var id = el.getAttribute('id');
          bible.available.push(id);
          bibleLocal[id]=local.name.bible[id];
          bibleAll[id]=bible.all[id];
        });
        local.update('bible',bibleLocal);
        bible.all=bibleAll;
      },
    });
  }
  */
},