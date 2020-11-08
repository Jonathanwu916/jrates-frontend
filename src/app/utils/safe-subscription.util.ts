import {Subscription} from 'rxjs';

enum RequiredSuperDestroy {
    RequiredSuperDestroy,
}

export abstract class SafeSubscription {
    protected readonly subscription: Subscription = new Subscription();

    /*
    - Enforce subclass to implement ngOnDestroy
    - Return enum RequiredSuperDestroy to enforce subclass to call 'unsubscribeAll()' in ngOnDestroy()
    */
    abstract ngOnDestroy(): RequiredSuperDestroy;

    protected safeSubscribe(sub: Subscription): Subscription {
        return this.subscription.add(sub);
    }

    protected unsubscribeAll(): RequiredSuperDestroy {
        this.subscription.unsubscribe();
        return RequiredSuperDestroy.RequiredSuperDestroy;
    }
}
