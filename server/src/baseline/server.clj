(ns baseline.server
  (:gen-class)
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [clojure.tools.cli :refer [cli]]
            [baseline.config :refer [config configure]]
            [compojure.handler :as handler]
            [baseline.middleware.routes :refer [routes]]
            [ring.middleware.json :refer [wrap-json-params]]))

(def app
  (-> routes
      handler/site
      wrap-json-params))

(defn start-jetty []
  (when-let [port (:port config)]
    (run-jetty app {:port port
                    :join? false})))

(defn -main [& args]
  (alter-var-root #'*read-eval* (constantly false))
  (configure args)
  (start-jetty))
