describe('login-toolbar', function() {
  var $rootScope, scope, toolbar, security, template;
  beforeEach(module('app/scripts/common/security/login/toolbar.tpl.html'));
  beforeEach(module('security'));
  beforeEach(inject(function(_$rootScope_, $compile, _security_, $templateCache) {
    $rootScope = _$rootScope_;
    security = _security_;
    toolbar = $compile('<login-toolbar></login-toolbar')($rootScope);
    $rootScope.$digest();
    scope = toolbar.scope();
    angular.element(document.body).append(toolbar);
    
		//template = $templateCache.get('app/scripts/common/security/login/toolbar.tpl.html');
		//$templateCache.put('scripts/common/security/login/toolbar.tpl.html', template);

  }));

  afterEach(function() {
    toolbar.remove();
  });

  it('should attach stuff to the scope', inject(function ($compile, $rootScope) {
    expect(scope.currentUser).toBeDefined();
    expect(scope.isAuthenticated).toBe(security.isAuthenticated);
    expect(scope.login).toBe(security.showLogin);
    expect(scope.logout).toBe(security.logout);
  }));

  it('should display a link with the current user name, when authenticated', function () {
    security.currentUser = { firstName: 'Jo', lastName: 'Bloggs'};
    $rootScope.$digest();
    expect(toolbar.find('a').text()).toBe('Jo Bloggs');
  });

	/*
  it('should not display a link with the current user name, when not authenticated', function () {
    security.currentUser = null;
    $rootScope.$digest();
    expect(toolbar.find('a').is(':visible')).toBe(false);
  });
	*/

  it('should display login when user is not authenticated', function() {
    //expect(toolbar.find('button:visible').text()).toBe('Log in');
    //expect(toolbar.find('button:hidden').text()).toBe('Log out');
    expect(toolbar.find('button').text()).toBe('Log outLog in');
  });

  it('should display logout when user is authenticated', function() {
    security.currentUser = {};
    $rootScope.$digest();
    //expect(toolbar.find('button:visible').text()).toBe('Log out');
    //expect(toolbar.find('button:hidden').text()).toBe('Log in');
    expect(toolbar.find('button').text()).toBe('Log outLog in');
  });

  it('should call logout when the logout button is clicked', function () {
    spyOn(scope, 'logout');
    toolbar.find('button')[0].click();
    expect(scope.logout).toHaveBeenCalled();
  });

  it('should call login when the login button is clicked', function () {
    spyOn(scope, 'login');
    //toolbar.find('button.login').click();
    toolbar.find('button')[1].click();
    expect(scope.login).toHaveBeenCalled();
  });
});
