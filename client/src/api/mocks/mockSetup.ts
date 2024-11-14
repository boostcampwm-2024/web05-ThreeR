import MockAdapter from "axios-mock-adapter";
import { api } from "@/api/instance";

export const mock = new MockAdapter(api, { delayResponse: 800 });
