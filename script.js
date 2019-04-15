var username;

function isEmail(u) {
    let exp = new RegExp(/[A-Za-z0-9{1}.]+@[A-Za-z0-9{1}]+\.(com|net)/);
    if (exp.test(u) == true) {
        console.log("A valid e-mail was entered");
    }
    else {
        console.log('Entry is invalid');
    }
}
function isPassword(p) {
    let exp = new RegExp(/(?=.*\d)(?=.*\!||\?||\#||\$||\%||\@)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
    if (exp.test(p) == true) {
        console.log("A valid password was entered");
        document.getElementById('length').style.color="green";
        document.getElementById('capital').style.color="green";
        document.getElementById('lowercase').style.color="green";
        document.getElementById('symbol').style.color="green";
    }
    else {
        console.log('Entry is invalid');
    }
}
function submit() {
    let username = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    document.getElementById('test').innerHTML = username;
    console.log(username);
    isEmail(username);
    isPassword(password);
}
//code from example https://www.sitepoint.com/instant-validation/
function addEvent(node, type, callback) {
    if (node.addEventListener) {
        node.addEventListener(type, function(e) {
            callback(e, e.target);
        }, false);
    } else if (node.attachEvent) {
        node.attachEvent('on' + type, function(e) {
            callback(e, e.srcElement);
        });
    }
}
//determines whether or not the input/textarea has attributes of pattern, required etc. This is passed to func instantValidation().
function shouldBeValidated(field) {
    return (
      !(field.getAttribute("readonly") || field.readonly) &&
      !(field.getAttribute("disabled") || field.disabled) &&
      (field.getAttribute("pattern") || field.getAttribute("required"))
    );
}
//if the form shouldbevalidated, create a variable invalid, which checks if the form meets the regex string req on blur
function instantValidation(field) {
    if (shouldBeValidated(field)) {
      var invalid =
        (field.getAttribute("required") && !field.value) ||
        (field.getAttribute("pattern") &&
          field.value &&
          !new RegExp(field.getAttribute("pattern")).test(field.value));
      if (!invalid && field.getAttribute("aria-invalid")) {
        field.removeAttribute("aria-invalid");
      } else if (invalid && !field.getAttribute("aria-invalid")) {
        field.setAttribute("aria-invalid", "true");
      }
    }
}
//calls addEvent, binds the instantValidation() function to a target.
addEvent(document, "change", function(e, target) {
console.log(e);
instantValidation(target);
});
//compatibility for IE8. Iterates through the inputs and applies the event listener to each input.
var fields = [
    document.getElementsByTagName("input")
  ];
  for (var a = fields.length, i = 0; i < a; i++) {
    for (var b = fields[i].length, j = 0; j < b; j++) {
      addEvent(fields[i][j], "change", function(e, target) {
        instantValidation(target);
      });
    }
}
// Regex meta characters
// \d is digit 0-9
// . means any character
// * means a quantifier, 0 or more
// .* wildcard matches anything
// \ s any whitespace
// \w any A-Z a-z 0-9
// \W \S any NON word, whitespace
// + 1 or more
// ? 0 or 1, optionally
// {min,max}
// ^ beginning
// $ end
// \b word boundary
// charclass [abc] a or b or c [.] literal . - and ^ in char class are special. - is whatever through whatever. ^ anything that isn't whatever follows
// alternation (.net|.com)