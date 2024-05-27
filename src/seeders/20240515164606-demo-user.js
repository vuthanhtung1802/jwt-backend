'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'User',
            [
                {
                    username: 'John Doe',
                    email: 'john.doe',
                    password: '123',
                },
                {
                    username: 'John Doe',
                    email: 'john.doe',
                    password: '123',
                },
                {
                    username: 'John Doe',
                    email: 'john.doe',
                    password: '123',
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
