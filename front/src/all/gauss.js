function diagonalize(M) {
    var m = M.length;
    var n = M[0].length;
    for(var k=0; k<Math.min(m,n); ++k) {
        i_max = findPivot(M, k);

        swap_rows(M, k, i_max);
        for(var i=k+1; i<m; ++i) {
            var c = A[i][k] / A[k][k];
            for(var j=k+1; j<n; ++j) {
                A[i][j] = A[i][j] - A[k][j] * c;
            }
        A[i][k] = 0;
        }
    }
}

function findPivot(M, k) {
    var i_max = k;
    for(var i=k+1; i<M.length; ++i) {
        if (Math.abs(M[i][k]) > Math.abs(M[i_max][k])) {
            i_max = i;
        }
    }
    return i_max;
}

function swap_rows(M, i_max, k) {
    if (i_max != k) {
        var temp = A[i_max];
        A[i_max] = A[k];
        A[k] = temp;
    }
}

function makeM(A, b) {
    for(var i=0; i<A.length; ++i) {
        A[i].push(b[i]);
    }
} 

function substitute(M) {
    var m = M.length;
    for(var i=m-1; i>=0; --i) {
        var x = M[i][m] / M[i][i];
        for(var j=i-1; j>=0; --j) {
            M[j][m] -= x * M[j][i];
            M[j][i] = 0;
        }
        M[i][m] = x;
        M[i][i] = 1;
    }
}

function extractX(M) {
    var x = [];
    var m = A.length;
    var n = A[0].length;
    for(var i=0; i<m; ++i){
        x.push(A[i][n-1]);
    }
    return x;
}

function solve(A, b) {
    makeM(A,b);
    diagonalize(A);
    substitute(A);
    var x = extractX(A);
    return x;
} 

let A = [
    [2,3,5],
    [3,1,-2],
    [1,3,4]
];

let b = [0,-2,-3];

var x = solve(A, b);

for(var i=0; i<3; i++){
    console.log(x[i].toFixed(1));
}

