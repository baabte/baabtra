angular.module('baabtra').directive('pdfBuilder', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
	
			var printSection = document.getElementById('printSection');
 
        // if there is no printing section, create one
        if (!printSection) {
            printSection = document.createElement('div');
            printSection.id = 'printSection';
            document.body.appendChild(printSection);
        }

			element.bind('click', function(evt){    
			  
			  var elemToPrint = document.getElementById(attrs.printElementId);
			  var domClone = elemToPrint.cloneNode(true);
               var doc = new jsPDF();
               //doc.text(20, 20, domClone);
              // doc.save('Test.pdf');
              //printSection.appendChild(domClone);
               doc.fromHTML(domClone, 15, 15, {
                 'width': 400
                });
               doc.save('sample-file.pdf'); 
           });
		}
	};
});