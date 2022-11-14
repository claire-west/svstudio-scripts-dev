/*
  obj: Object
*/
lib.inspectObject = function(obj) {
  var props = [];
  for (var prop in obj) {
    props.push(prop + ' : ' + obj[prop]);
  }

  SV.showMessageBox(SV.T("Object Inspector"), SV.T(props.join('\n')));
}