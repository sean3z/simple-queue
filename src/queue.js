var queue = {
    chain: [],
    running: false,
    handlers: {},

    add: function(cb, args) {
        cb && queue.chain.push({
            fn: typeof cb == 'string' ? queue.handlers[cb] : cb,
            args: args
        });

        queue.chain.length == 1 && queue.next();
    },

    next: function() {
        if (queue.running) return;
        queue.running = true;
        var cb = queue.chain.shift() || {};
        typeof cb.fn == 'function' && cb.fn(queue.done, cb.args);
    },

    handler: function(name, fn) {
        queue.handlers[name] = fn;
    },

    done: function() {
        queue.running = false;
        queue.chain.length > 0 && queue.next();
    }
};

module.exports = queue;
