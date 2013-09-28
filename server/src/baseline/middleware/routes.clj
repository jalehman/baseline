(ns baseline.middleware.routes
  (:require [compojure.route :refer :all]
            [compojure.core :refer [GET POST PUT ANY defroutes context]]
            [ring.util.response :as resp]
            [cemerick.friend :as friend]
            [baseline.middleware.common :refer [route]]
            [baseline.api.common :refer [json-response]]))

(defroutes routes

  ;; Routes go here

  (resources "/")
  (ANY "*" [] (resp/resource-response "index.html" {:root "public"}))
  (not-found "Not found"))
