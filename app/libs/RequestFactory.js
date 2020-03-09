import UserRequest from '../requests/UserRequest';
import HomeRequest from '../requests/HomeRequest';

const requestMap = {
  UserRequest,
  HomeRequest,
};

const instances = {};

export default class RequestFactory {
  static getRequest(classname) {
    const RequestClass = requestMap[classname];
    if (!RequestClass) {
      throw new Error(`Invalid request class name: ${classname}`);
    }

    let requestInstance = instances[classname];
    if (!requestInstance) {
      requestInstance = new RequestClass();
      instances[classname] = requestInstance;
    }

    return requestInstance;
  }
}
