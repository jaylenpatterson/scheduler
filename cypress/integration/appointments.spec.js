describe("Appointments", () => {
  beforeEach(() => {
   cy.request("GET", "/api/debug/reset");
 
   cy.visit("/");
 
   cy.contains("Monday");
  });
 
  it("should book an interview", () => {
   

  });

  it("should edit the interview", () => {

  })
  
  it("should cancel an interview", () => {


  });
 });