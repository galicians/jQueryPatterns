// The adapter pattern translates an interface for an object or class into an interface compatible with a specific
// system.

// Adapters basically allow objects or classes to function together which normally could not due to their incompatible interfaces.
// the adapter translates calls to its interface into calls to the original interface and the code required to achieve this
// is usually quite minimal.

// One example of an adapter we may have used is the jQuery jQuery.fn.css() method. It helps normalize the interfaces to how
// styles can be applied across a number of browsers, making it trivial for us to use a simple syntax which is adapted to use
// what the browser actually supports behind the scenes:

// Setting opacity
$(".container").css({ opacity: .5 });

// Getting opacity
var currentOpacity = $(".container").css("opacity");

The corresponding jQuery core cssHook which makes the above possible can be seen below:

get: function(elem, computed) {
    // IE uses filters for opacity
    return ropacity.test( {
        computed && elem.currentStyle ? elem.currentStyle.filter: elem.style.filter) || "" ) ?
        (parseFloat( RegExp.$1 ) / 100 ) + "" : computed ? "1" : "";
    },
set: function(elem, value) {
    var style = elem.style;
    var curentStyle = elem.currentStyle;
    var opacity = jQuery.isNumeric(value ) ? "alpha(opacity=" + value * 100 + ")" : "";
    var filter = currentStyle && currentStyle.filter || style.filter || "";

    // IE has trouble with opacity if it does not have layout. Force it by setting the zoom level
    style.zoom = 1;
    // if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
    if ( value >= 1 && jQuery.trim(filter.replace(ralpha, "")) === "" ) {
        // Setting style.filter to null, "" & " " still leave "filter;" in the cssText if "filter:" is present at all,
        // clearType is disabled, we want to avoid this style.removeAttribute
        // is IE Only, but so apprently is this code path...
        style.removeAttribute("filter");

        //if there is no filter style applied in a css rule, we are done
        if(currentStyle && !currentStyle.filter ){
            return;
        }
    }
    // otherwise, set new filter values
    style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + " " + opacity;

}
};
