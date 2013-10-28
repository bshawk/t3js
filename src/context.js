/**
 * @fileoverview Contains the Context type which is used by modules to interact
 * 		with the environment.
 * @author nzakas
 */

/*global Box*/

/**
 * The object type that modules use to interact with the environment. Used
 * exclusively within Box.Application, but exposed publicly for easy testing.
 * @param {Box.Application} application The application object to wrap.
 * @param {string} moduleName The name of the module that will use this object.
 * @param {string} moduleId ID of module's DOM element
 * @constructor
 */
Box.Context = function(application, moduleName, moduleId) {

	'use strict';

	//-------------------------------------------------------------------------
	// Passthrough Methods
	//-------------------------------------------------------------------------

	/**
	 * Passthrough method to application that broadcasts messages.
	 * @param {string} name Name of the message event
	 * @param {any} [data] Custom parameters for the message
	 * @returns {void}
	 */
	this.broadcast = function(name, data) {
		application.broadcast(name, data);
	};

	/**
	 * Passthrough method to application that retrieves services.
	 * @param {string} serviceName The name of the service to retrieve.
	 * @returns {Object|null} An object if the service is found or null if not.
	 */
	this.getService = function(serviceName) {
		return application.getService(serviceName);
	};

	/**
	 * Returns any configuration information that was output into the page
	 * for this instance of the module.
	 * @param {string} [name] Specific config parameter
	 * @returns {any} config value or the entire configuration JSON object
	 *                if no name is specified (null if either not found)
	 */
	this.getConfig = function(name) {
		return application.getModuleConfig(this.getElement(), name);
	};

	/**
	 * Returns global configuration data
	 * @param {string} [name] Specific config parameter
	 * @returns {any} config value or the entire configuration JSON object
	 *                if no name is specified (null if either not found)
	 */
	this.getGlobalConfig = function(name) {
		return application.getGlobalConfig(name);
	};

	//-------------------------------------------------------------------------
	// Service Shortcuts
	//-------------------------------------------------------------------------

	/**
	 * Returns the element that represents the module. This is determined by using
	 * the moduleName as part of the HTML element ID.
	 * @returns {HTMLElement} The element representing the module.
	 */
	this.getElement = function() {
		var dom = this.getService('dom');
		return dom.query('#' + moduleId);
	};

	/**
	 * Passthrough method to application for navigate
	 * @param {string} url The URL to change to. If not provided, new page state
	 *                     should have already been set on Box_Nav
	 * @param {Object} [state] Additional state information to store for
	 * 		the URL change.
	 * @param {Object} [params] Legacy params for box.load()
	 * @returns {void}
	 */
	this.navigate = function(url, state, params) {
		application.navigate(url, state, params);
	};

};
