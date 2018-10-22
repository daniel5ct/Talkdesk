import { Subscription } from "./Subscription";

export class App
{
    public id: string;
    public name: string;
    public description: string;
    public categories: Array<string>;
    public subscriptions: Array<Subscription>;
}