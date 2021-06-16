const { expect } = require('chai');
const _ = require('lodash');
const mongoose = require('mongoose');

const GridService = require('../services/GridService');

const images = { images: [
    { id :'image-204900001', url: 'https://placeimg.com/2560/2560/nature' },
    { id :'image-204900002', url: 'https://placeimg.com/2560/2560/nature' },
    { id :'image-204900003', url: 'https://placeimg.com/2560/2560/nature' },
    { id :'image-204900004', url: 'https://placeimg.com/2560/2560/nature' },
    { id :'image-204900005', url: 'https://placeimg.com/2560/2560/nature' },
    { id :'image-204900006', url: 'https://placeimg.com/2560/2560/nature' },
    { id :'image-204900007', url: 'https://placeimg.com/2560/2560/nature' },
    { id :'image-204900008', url: 'https://placeimg.com/2560/2560/nature' }
]};
const userId = '5ffec928e083f6d8a52ad109';

describe('Test DB setup', () => {
    const db = mongoose.connection;
    const connectWithRetry = () => {
        mongoose.connect('mongodb://mongoc:27017/photo-grid-test', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
    };
    db.once('open', () => {
        for (var collection in mongoose.connection.collections) {
            mongoose.connection.collections[collection].remove();
        }
    });
    connectWithRetry();
});

describe('PhotoService', function() {
    
    describe('save', function() {

        it('should return error - when try to creating grid using less images', async () => {

            try {
                await GridService.save(images, userId);
            } catch (error) {
                expect(error).to.equal(`"images" must contain at least 9 items`);
            }
        });

        it('should return error - when try to creating grid using invalid object keys', async () => {

            const fakeRequest = _.cloneDeep(images);
            fakeRequest.images.push({ 
                id :'image-204900009',
                url_error: 'https://placeimg.com/2560/2560/nature' }
            );
            try {
                await GridService.save(fakeRequest, userId);
            } catch (error) {
                expect(error).to.equal(`"url" is required`);
            }
        });

        it('should return success - when try to create grid with 9 images', async () => {
            const fakeRequest = _.cloneDeep(images);
            fakeRequest.images.push({ 
                id :'image-204900009',
                url: 'https://placeimg.com/2560/2560/nature' }
            );
            const result = await GridService.save(fakeRequest, userId);
            expect(result).to.be.an('array');
            expect(result).to.have.length(9);
            expect(result[0])
                        .to.have.property('id')
                        .to.be.an('string');
            expect(result[0])
                        .to.have.property('url')
                        .to.be.an('string');
        });
    });

    describe('update', function() {

        it('should return error - when try to update grid using less images', async () => {

            try {
                await GridService.update(images, userId);
            } catch (error) {
                expect(error).to.equal(`"images" must contain at least 9 items`);
            }
        });

        it('should return error - when try to update grid using invalid object keys', async () => {

            const fakeRequest = _.cloneDeep(images);
            fakeRequest.images.push({ 
                id :'image-204900009',
                url_error: 'https://placeimg.com/2560/2560/nature' }
            );
            try {
                await GridService.update(fakeRequest, userId);
            } catch (error) {
                expect(error).to.equal(`"url" is required`);
            }
        });

        it('should return success - when try to update grid with 9 images', async () => {
            const fakeRequest = _.cloneDeep(images);
            fakeRequest.images.push({ 
                id :'image-204900009',
                url: 'https://placeimg.com/2560/2560/nature' }
            );
            const result = await GridService.update(fakeRequest, userId);
            expect(result).to.be.an('array');
            expect(result).to.have.length(9);
            expect(result[0])
                        .to.have.property('id')
                        .to.be.an('string');
            expect(result[0])
                        .to.have.property('url')
                        .to.be.an('string');
        });
    });

    describe('getGridByUser', function() {

        const userId = '5ffec928e083f6d8a52ad109';

        it('should return success with empty data set with invalid user id', async () => {
            const result = await GridService.getGridByUser('5ffec928e083f6d8a52ad108');
            expect(result).to.be.an('array');
            expect(result).to.have.length(0);
        });
        
        it('should return success with 9 length array data set with valid user id', async () => {
            const result = await GridService.getGridByUser(userId);
            expect(result).to.be.an('array');
            expect(result).to.have.length(9);
            expect(result[0])
                        .to.have.property('id')
                        .to.be.an('string');
            expect(result[0])
                        .to.have.property('url')
                        .to.be.an('string');
        });
    });
});