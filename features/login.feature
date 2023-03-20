Feature: Login
  As a user
  I want to login

  Scenario: Successful login with valid credentials
    Given I open the login page
    When I login with username "tomsmith" and password "SuperSecretPassword!"
    Then I should see a success message
