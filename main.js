let g_input = [
	document.querySelector('#g-in-0'),
	document.querySelector('#g-in-1'),
	document.querySelector('#g-in-2'),
];

let g_equation = {
	'lhs': [ document.querySelector('#g-ls-0'), ],
	'rhs': [ document.querySelector('#g-rs-0'), ],
};

let g_parent = document.querySelector('#eq')

let btn_run = document.querySelector('#g-test');
let btn_add = document.querySelector('#g-add');

function recursiveGrammar(nonTerm, str, slhs) {
	if (slhs.length === 0) return false;
	let ntl = nonTerm[slhs];
	let success = false;
	console.log(`\'${str}\'`, `\'${slhs}\'`, 'NTL', ntl);
	for (let i = 0; i < ntl.length; i++) {
		let opt = ntl[i];
		let len = opt.length-1;
		console.log('CMP', `\'${str.substring(0,len)}\'`, `\'${opt.substring(0,len)}\'`);
		if (str.substring(0,len) === opt.substring(0,len)) {
			if (opt.length === 0 && str.length === 0) {
				return true;
			} else {
				success = recursiveGrammar(nonTerm, str.substring(len,str.length), opt.substring(len,len+1));
				if (success) return true;
			}
		}
	}
	return success;
}

function mainGrammar() {
	let nonTerm = {};
	let count = g_equation.lhs.length;
	console.log('COUNT', count);
	for (let i = 0; i < count; i++) {
		let symbol = g_equation.lhs[i].value.toUpperCase();
		g_equation.lhs[i].value = symbol;
		let rule = g_equation.rhs[i].value;
		if (symbol in nonTerm) {
			nonTerm[symbol].push(rule);
		} else {
			nonTerm[symbol] = [ rule ];
		}
		console.log(i, 'SYMBOL', symbol, nonTerm[symbol].length)
	}
	let len = g_equation.lhs[0].value.length;
	let init = g_equation.lhs[0].value.substring(len-1,len);
	console.log('INIT', init);
	for (let i = 0; i < g_input.length; i++) {
		let text = g_input[i].value;
		if (recursiveGrammar(nonTerm, text, init)) {
			g_input[i].className = 'txt-okay';
		} else {
			g_input[i].className = 'txt-fail';
		}
	}
}

btn_add.addEventListener('click',
	function () {
		let count = g_equation.lhs.length + 1;
		
		let lhsf = document.createElement('input');
		lhsf.id = `g-ls-${count}`;
		lhsf.className = 'txt-lhs';
		lhsf.type = 'text';
		lhsf.placeholder = 'LHS';
		lhsf.maxLength = 1;
		g_parent.appendChild(lhsf);
		g_equation.lhs.push(lhsf);

		let rhsf = document.createElement('input');
		rhsf.id = `g-rs-${count}`;
		rhsf.className = 'txt-rhs';
		rhsf.type = 'text';
		rhsf.placeholder = 'λ';
		g_parent.appendChild(rhsf);
		g_equation.rhs.push(rhsf);

		let sp = document.createElement('hr');
		sp.className = 'hr-br';
		g_parent.appendChild(sp);
	}
);

btn_run.addEventListener('click',
	function () {
		mainGrammar();
	}
);