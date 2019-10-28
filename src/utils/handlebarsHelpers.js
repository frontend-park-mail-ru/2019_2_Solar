Handlebars.registerHelper('Comparison', function(value1, operator, value2) {
    switch (operator) {
    case '==':
        return (value1 == value2) ? true : false;
    case '!=':
        return (value1 != value2) ? true : false;
    case '<':
        return (value1 < value2) ? true : false;
    case '<=':
        return (value1 <= value2) ? true : false;
    case '>':
        return (value1 > value2) ? true : false;
    case '>=':
        return (value1 >= value2) ? true : false;
    case '&&':
        return (value1 && value2) ? true : false;
    case '||':
        return (value1 || value2) ? true : false;
    default:
        return false;
    }
});
