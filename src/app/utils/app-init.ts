import { KeycloakService } from 'keycloak-angular';

 
export function initializer(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                await keycloak.init({
                    config:
                        {
                            realm: 'siartes',
                            url: 'http://siempre.mincultura.gov.co:8090/auth',
                            clientId: 'clisiartes'
                        },
                    initOptions: {
                        onLoad: 'login-required',
                        checkLoginIframe: false
                    },
                    bearerExcludedUrls: []
                });
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    };
}

