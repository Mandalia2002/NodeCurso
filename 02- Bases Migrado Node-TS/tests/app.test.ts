describe('Test in app file', () => {
    it('should be true', () => {
        //Arrange
        const num1=1;
        const num2=1;
        //Act
        const result=num1+num2;
        //Assert
        if (result==3) {
            throw new Error('Error in the test');
        } else{
            throw new Error('Test passed');
        }
    });
});