angular.module('jwt-AuthHeader-Helper', ['angular-jwt'])
    .config(function Config($httpProvider, jwtInterceptorProvider) {
        jwtInterceptorProvider.tokenGetter = function(jwtHelper, $http) {
          var jwt = localStorage.getItem('JWT');
          var refreshToken = localStorage.getItem('refresh_token');

          var requestNewToken = false;
          if (jwt == null || jwt == 'undefined'){
            requestNewToken = true;
          }
          else{
            //if is expired, we will need a new Token
            requestNewToken = jwtHelper.isTokenExpired(jwt);
          }

            if(requestNewToken) {
              // This is a promise of a JWT id_token
              return $http({
                url: 'http://localhost:3005/auth/getToken/',
                // This will not send the JWT for this call
                skipAuthorization: true,
                method: 'GET',
                refresh_token : refreshToken
              }).then(function(response) {
                //set the new token inside localStorage
                jwt = response.data.token;
                localStorage.setItem('JWT', jwt);
                return jwt;
              });
          } else {
              return jwt;
          }
        }
        $httpProvider.interceptors.push('jwtInterceptor');
    })
