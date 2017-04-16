const assert = require('chai').assert;
const expect = require('chai').expect;
const Customer = require('../src/module/customer');
const products = require('../src/module/product/data');

suite('when customer want subscribe', function(){
    suite('when customer select one product', function() {
        test('then customer given one product', function () {
            let customer = new Customer();

            customer.selectProduct(products[0]);

            assert.equal(customer.product.name, 'one');
        });
    });

    suite('when customer selected one product and want select two product', function() {
        test('then customer given two product', function () {
            let customer = new Customer({ product: products[0] });

            customer.selectProduct(products[1]);

            assert.equal(customer.product.name, 'two');
        });
    });

    suite('when customer select one interval', function() {
        test('then customer given one interval', function () {
            let customer = new Customer();

            customer.selectInterval('once in two months');

            assert.equal(customer.interval, 'once in two months');
        });
    });

    suite('when customer selected one interval and want select monthly interval', function() {
        test('then customer given monthly interval', function () {
            let customer = new Customer({ interval: 'once in two months' });

            customer.selectInterval('monthly');

            assert.equal(customer.interval, 'monthly');
        });
    });

    suite('when customer select date', function() {
        test('then customer given date', function () {
            let customer = new Customer();

            customer.selectDate(new Date('2017-04-25'));

            assert.equal(customer.dates[0].toISOString(), '2017-04-25T00:00:00.000Z');
        });
    });

    suite('when customer select delivery twice a month', function() {
        test('then customer should be select two different dates', function () {
            let customer = new Customer({ interval: 'twice a month' });

            customer.selectDate(new Date('2017-04-02'));
            customer.selectDate(new Date('2017-04-27'));

            assert.equal(customer.dates[1].toISOString(), '2017-04-27T00:00:00.000Z');
        });
    });

    suite('when customer select delivery twice a month and select two identical dates', function() {
        test('then customer given error', function () {
            let customer = new Customer({ interval: 'twice a month' });
            let date = new Date('2017-04-02');

            customer.selectDate(date);

            expect(() => customer.selectDate(date)).to.throw(/Dates should be different!/);
        });
    });
});

