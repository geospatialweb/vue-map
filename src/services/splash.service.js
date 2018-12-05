'use strict';

import { splash } from '../config/splash.config';
import { splashStore } from '../stores/splash.store';

export const splashService = {
	hideSplash()
	{
		splashStore.setLayerActive(splash.splashScreen.name);
	}
}
